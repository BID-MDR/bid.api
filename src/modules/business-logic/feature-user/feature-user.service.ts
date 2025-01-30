import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { totp } from 'otplib';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { BaseService } from 'src/core/services/base.service';
import { commonPropertyTransfer } from 'src/core/utils/common-property-transfer.util';
import { CreateUserDto } from 'src/modules/data-interaction/database/dtos/user/create-user.dto';
import { UpdateUserProgramTypeDto } from 'src/modules/data-interaction/database/dtos/user/update-user-program-type.dto';
import { UpdateUserDto } from 'src/modules/data-interaction/database/dtos/user/update-user.dto';
import { UserAppointmentEntity } from 'src/modules/data-interaction/database/entitites/user-appointment.entity';
import { UserOtpRequestEntity } from 'src/modules/data-interaction/database/entitites/user-otp-request.entity';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
import { UserOtpStatusEnum } from 'src/modules/data-interaction/database/enums/user-otp.enum';
import { AddressRepository } from 'src/modules/data-interaction/database/repositories/address.repository';
import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { UserBeneficiaryInfoRepository } from 'src/modules/data-interaction/database/repositories/user/user-beneficiary-info.repository';
import { UserProfessionalInfoRepository } from 'src/modules/data-interaction/database/repositories/user/user-professional-info.repository';
import { UseRestingDayRepository } from 'src/modules/data-interaction/database/repositories/user/user-resting-day.repository';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { EmailFacade } from 'src/modules/data-interaction/facade/apis/email/email.facade';
import { CaubFacade } from 'src/modules/data-interaction/facade/apis/gov/caubr/caub.facade';
import { ConfeaFacade } from 'src/modules/data-interaction/facade/apis/gov/confea/confea.facade';
import { StorageFacade } from 'src/modules/data-interaction/facade/apis/storage/storage.facade';
import { ConfirmPasswordUpdateRequestDto } from './dtos/confirm-password-update.request.dto';
import { ProfessionalCouncilRegistrationResponseDto } from './dtos/professional-council-resgistration-reponse.dto';
import { CreateAddressDto } from 'src/modules/data-interaction/database/dtos/address/create-address.dto';
import { UpdateAddressDto } from 'src/modules/data-interaction/database/dtos/address/update-address.dto';
import { CreateUserGeneratedMediaDto } from 'src/modules/data-interaction/database/dtos/user/user-generated-media/create-user-generated-media.dto';
import { MediaUploadDto } from 'src/modules/data-interaction/database/dtos/media/media-upload.dto';
import { TechnicalVisitRepository } from 'src/modules/data-interaction/database/repositories/technical-visit.repository';
import { CostEstimateRepository } from 'src/modules/data-interaction/database/repositories/costEstimate/costEstimate.repository';
import { ImprovementProjectRepository } from 'src/modules/data-interaction/database/repositories/improvement-project/improvement-project.repository';
import { RegisterWorkRepository } from 'src/modules/data-interaction/database/repositories/registerWork/registerWork.repository';
import { ContractResignedRepository } from 'src/modules/data-interaction/database/repositories/contract-resigned/contract-resigned.repository';
import { ContractRepository } from 'src/modules/data-interaction/database/repositories/contract/contract.repository';

@Injectable()
export class FeatureUserService extends BaseService<UserEntity, CreateUserDto, UpdateUserDto> {
    constructor(
        private userRepository: UserRepository,
        private userAppointmentRepository: UserAppointmentRepository,
        private userBeneficiaryInfoRepository: UserBeneficiaryInfoRepository,
        private userProfessionalInfoRepository: UserProfessionalInfoRepository,
        private userRestingdayRepository: UseRestingDayRepository,
        private addressRepository: AddressRepository,
        private readonly caubFacade: CaubFacade,
        private readonly confeaFacade: ConfeaFacade,
        private readonly emailFacade: EmailFacade,
        private readonly storageFacade: StorageFacade,
        private readonly configService: ConfigService,
        private readonly technicalVisitRepo: TechnicalVisitRepository,
        private readonly costEstimateRepo: CostEstimateRepository,
        private readonly improvementProjectRepo: ImprovementProjectRepository,
        private readonly registerWorkRepo: RegisterWorkRepository,
        private readonly contractResignedRepo: ContractResignedRepository,
        private readonly contractRepo: ContractRepository
    ) {
        super(userRepository);
    }

    async checkProfessionalUserCaubRegistration(cpf: string): Promise<ProfessionalCouncilRegistrationResponseDto> {
        return this.caubFacade.getProfessionalRegistrationStatusFromCaub(cpf);
    }

    async checkProfessionalUserConfeaRegistration(cpf: string): Promise<ProfessionalCouncilRegistrationResponseDto> {
        return this.confeaFacade.getProfessionalRegistrationStatusFromConfea(cpf);
    }

    async create(data: CreateUserDto): Promise<UserEntity> {
        data.password = await this.hashStringData(data.password);
        if (data.uploadedProfilePicture && typeof data.uploadedProfilePicture !== 'string') {           
            data.profilePicture = await this.storageFacade.uploadMedia(
                data.uploadedProfilePicture.mimeType,
                data.uploadedProfilePicture.fileName,
                data.uploadedProfilePicture.data,
            );
        }

        console.log(data);
        return await super.create(data);
    }

    async updateById(id: string, data: any) {

        const user = await this.userRepository.findById(id)
        if (data.IUser.paramToBeUpdated === 'personal_info') {
            const { address, ...rest } = data.IUser
            return await this.userRepository.update(id, rest)
        } else if (data.IUser.paramToBeUpdated === 'address') {

            const { address, ...rest } = data.IUser
            return await this.addressRepository.update(user.address.id, data.IUser.address)
        } else {
            //    const workRequest = await this.workRequestRepository.create(data.IUser.workRequest)
            //    data.IUser.address = user.address
            //    const {id, ...rest} = workRequest
            //    data.IUser.workRequest = rest
            //    data.IUser.workRequest.address = user.address
            //await this.userRepository.update(user.id, data.IUser)
        }

    }

    async updateUserProgramTypeDto(id: string, dto: UpdateUserProgramTypeDto) {
        return await this.userRepository.updateUserProgramType(id, dto.programType)
    }

    async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(id);
        if (data.newAppointments || data.updateAppointments) {
            let appointments = new Array<UserAppointmentEntity>();
            if (data.newAppointments) {
                if (
                    await this.userAppointmentRepository.areDatesWithinAnyAppointment(
                        data.newAppointments.map((a) => a.from).concat(data.newAppointments.map((a) => a.to)),
                    )
                ) {
                    throw new BadRequestException('Data já está ocupada.');
                }
                for (const iterator of await this.userAppointmentRepository.createMany(data.newAppointments)) {
                    iterator.user = user;
                    await iterator.save();
                    appointments.push(iterator);
                }
            }
            if (data.updateAppointments) {
                if (
                    await this.userAppointmentRepository.areDatesWithinAnyAppointment(
                        data.updateAppointments.map((a) => a.from).concat(data.updateAppointments.map((a) => a.to)),
                    )
                ) {
                    throw new BadRequestException('Data já está ocupada.');
                }
                await Promise.all(
                    data.updateAppointments.map(async (appointment) => {
                        appointments.push(await this.userAppointmentRepository.update(appointment.id, appointment));
                    }),
                );
            }
            user.appointments = appointments;
        }

        if (data.beneficiaryUserInfo) {
            await this.userBeneficiaryInfoRepository.update(data.beneficiaryUserInfo.id, data.beneficiaryUserInfo);
        }

        if (data.professionalUserInfo) {
            user.professionalUserInfo = commonPropertyTransfer(data.professionalUserInfo, user.professionalUserInfo);
            if (data.professionalUserInfo.restingDays) {
                const oldRestingDays = await this.userRestingdayRepository.findAllByUserProfessionalInfoId(
                    data.professionalUserInfo.id,
                );
                for (const iterator of oldRestingDays) {
                    await this.userRestingdayRepository.hardDelete(iterator.id);
                }
                const newRestingDays = await this.userRestingdayRepository.createMany(
                    data.professionalUserInfo.restingDays,
                );
                for (const iterator of newRestingDays) {
                    iterator.userProfessionalInfo = user.professionalUserInfo;
                    await iterator.save();
                }

                delete data.professionalUserInfo.restingDays;
            }
            if (data.professionalUserInfo.addresses) {
                const oldAddresses = await this.addressRepository.findAllByUserProfessionalInfoId(
                    data.professionalUserInfo.id,
                );
                for (const iterator of oldAddresses) {
                    await this.addressRepository.hardDelete(iterator.id);
                }
                const newAddresses = await this.addressRepository.createMany(data.professionalUserInfo.addresses);
                for (const iterator of newAddresses) {
                    iterator.userProfessionalInfo = user.professionalUserInfo;
                    await iterator.save();
                }

                delete data.professionalUserInfo.addresses;
            }
            await this.userProfessionalInfoRepository.update(data.professionalUserInfo.id, data.professionalUserInfo);
        }

        if (data.address) {
            await this.addressRepository.update(data.address.id, data.address);
        }

        delete data.newAppointments;
        delete data.updateAppointments;
        delete data.beneficiaryUserInfo;
        delete data.professionalUserInfo;
        delete data.address;
        return await super.update(id, data);
    }


    async updateAddress(dto: UpdateAddressDto) {

        if(dto.id && dto.id !== '') {
             delete dto.userId
            const update = await this.addressRepository.update(dto.id, dto)
            return update
        }else {
            delete dto.id
            const addressRes = await this.addressRepository.create(dto)
            const user = await this.userRepository.findById(dto.userId)

            addressRes.user = user
            user.address = addressRes
            await addressRes.save()
            await user.save()
            return addressRes.reload()
        }
   
    }

    async updateProfilePicture(userId: string, dto: MediaUploadDto) {
        let user = await this.userRepository.getById(userId) as any;
        const media = await this.storageFacade.uploadMedia(
            dto.mimeType,
            dto.fileName,
            dto.data,
        );

        const result = await this.userRepository.updateProfilePicture(userId, media)

        return result

    }
    async updatePasswordRequest(userId: string) {
        totp.options = {
            digits: 6,
            step: 300,
        };
        const token = totp.generate(this.configService.get(EnviromentVariablesEnum.OTP_TOKEN));
    
        const user = await this.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
    
        const otpRequest = new UserOtpRequestEntity();
        otpRequest.token = await this.hashStringData(token);
        otpRequest.user = user;
    
        await otpRequest.save();
    
        user.otpRequest = otpRequest;
        await user.save();
    
        await this.emailFacade.sendPasswordResetCodeEmail(token, user.email);
    }

    async verifyToken(userId: string, token: string) {
        const user = await this.findById(userId);

   
        totp.options = {
            digits: 6,
            step: 300,
            window: 1,
        };

        try {
            const valid = totp.check(token, this.configService.get(EnviromentVariablesEnum.OTP_TOKEN));
            console.log(valid, '<--')
            if (valid) {
                user.otpRequest.status = UserOtpStatusEnum.VERIFIED;
                await user.otpRequest.save();
            } else if (user.otpRequest.createdAt.getTime() + 300_000 < Date.now()) {
                await user.otpRequest.remove();
                user.otpRequest = null;
                await user.save();
                throw new BadRequestException('Token expirado.');
            }
            return { valid };
        } catch (error) {
            if (user.otpRequest.createdAt.getTime() + 300_000 < Date.now()) {
                await user.otpRequest.remove();
                user.otpRequest = null;
                await user.save();
                throw new BadRequestException('Token expirado.');
            }
            return { valid: false };
        }
    }

    async confirmUpdatePasswordRequest(userId: string, dto: ConfirmPasswordUpdateRequestDto) {
        const user = await this.findById(userId);

        if (!user.otpRequest?.token) {
            throw new BadRequestException('Nenhum pedido de recuperação de senha foi feito para este usuário.');
        }

        if (
            user.otpRequest.createdAt.getTime() + 300_000 < Date.now() &&
            user.otpRequest.status === UserOtpStatusEnum.PENDING
        ) {
            throw new BadRequestException('Token expirado.');
        }

        if (user.otpRequest.status === UserOtpStatusEnum.PENDING) {
            throw new BadRequestException('Token ainda não foi verificado.');
        }

        user.password = await this.hashStringData(dto.password);
        // await user.otpRequest.remove();
        user.otpRequest = null;
        await user.save();
    }
    async list() {
        return await this.userRepository.list();
    }

    async findNearbyEmployees( latitude: number,
        longitude: number) {
        return await this.userRepository.findNearbyEmployees( latitude, longitude);
    }

    async findNearbyBeneficiary( latitude: number,
        longitude: number,
        radiusInKm: number,) {
        return await this.userRepository.findNearbyBeneficiary( latitude, longitude, radiusInKm);
    }

    async listBeneficiary(){
        return await this.userRepository.listBeneficiary();
    }

    async listBeneficiaryByMonth(month: number){
        return await this.userRepository.findMonth(month);
    }

    async getByCpf(cpf: string) {
        return await this.userRepository.findByCpf(cpf);
    }

    async getById(id: string) {
        return await this.userRepository.getById(id);
    }

    private async hashStringData(stringData: string): Promise<string> {
        return bcrypt.hash(stringData, 13);
    }
    async getDashboardDataWithJoinBeneficiary(userId: string) {
        // Example of performing a join to fetch additional data from other tables
        return await this.userRepository.getDashboardDataWithJoinBeneficiary(userId);
    }
    async getDashboardDataWithJoinProfessional(userId: string) {
        // Example of performing a join to fetch additional data from other tables
        return await this.userRepository.getDashboardDataWithJoinProfessional(userId);
    }

    async listAppoitmentByProfessionalId(professionalId: string){
        const techVisitList = (await this.technicalVisitRepo.getByProfessionalAndStatus(professionalId))
        .map(item => ({ ...item, source: 'TechnicalVisit' }));
    const costEstimateList = (await this.costEstimateRepo.getByProfessionalAndStatus(professionalId))
        .map(item => ({ ...item, source: 'CostEstimate' }));
    const improvementProjectList = (await this.improvementProjectRepo.getByProfessionalAndStatus(professionalId))
        .map(item => ({ ...item, source: 'ImprovementProject' }));
    const registerWorkList = (await this.registerWorkRepo.getByProfessionalAndStatus(professionalId))
        .map(item => ({ ...item, source: 'RegisterWork' }));
    const contractResignedList = (await this.contractResignedRepo.getByProfessionalAndStatus(professionalId))
        .map(item => ({ ...item, source: 'ContractResigned' }));
    const contractList = (await this.contractRepo.getByProfessionalAndStatus(professionalId))
        .map(item => ({ ...item, source: 'Contract' }));
    
    const allAppointments = [
        ...techVisitList,
        ...costEstimateList,
        ...improvementProjectList,
        ...registerWorkList,
        ...contractResignedList,
        ...contractList,
    ];
    return allAppointments
    }

}
