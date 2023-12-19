import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateUserDto } from 'src/modules/data-interaction/database/dtos/user/create-user.dto';
import { UpdateUserDto } from 'src/modules/data-interaction/database/dtos/user/update-user.dto';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { CaubFacade } from 'src/modules/data-interaction/facade/apis/gov/caubr/caub.facade';
import { ProfessionalCouncilRegistrationResponseDto } from './dtos/professional-council-resgistration-reponse.dto';
import * as bcrypt from 'bcrypt';
import { ConfeaFacade } from 'src/modules/data-interaction/facade/apis/gov/confea/confea.facade';
import { totp } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { UserOtpRequestEntity } from 'src/modules/data-interaction/database/entitites/user-otp-request.entity';
import { EmailFacade } from 'src/modules/data-interaction/facade/apis/email/email.facade';
import { ConfirmPasswordUpdateRequestDto } from './dtos/confirm-password-update.request.dto';
import { UserOtpStatusEnum } from 'src/modules/data-interaction/database/enums/user-otp.enum';
import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { UserAppointmentEntity } from 'src/modules/data-interaction/database/entitites/user-appointment.entity';
import { UserBeneficiaryInfoRepository } from 'src/modules/data-interaction/database/repositories/user/user-beneficiary-info.repository';
import { UserBeneficiaryInfoEntity } from 'src/modules/data-interaction/database/entitites/user-beneficiary-info.entity';
import { UserProfessionalInfoEntity } from 'src/modules/data-interaction/database/entitites/user-professional-info.entity';
import { UserProfessionalInfoRepository } from 'src/modules/data-interaction/database/repositories/user/user-professional-info.repository';
import { UseRestingDayRepository } from 'src/modules/data-interaction/database/repositories/user/user-resting-day.repository';
import { AddressEntity } from 'src/modules/data-interaction/database/entitites/address.entity';
import { AddressRepository } from 'src/modules/data-interaction/database/repositories/address.repository';
import { commonPropertyTransfer } from 'src/core/utils/common-property-transfer.util';

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
        private readonly configService: ConfigService,
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

        return await super.create(data);
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
            await this.userProfessionalInfoRepository.update(data.professionalUserInfo.id, data.professionalUserInfo);
        }

        if (data.addresses) {
            let addresses = new Array<AddressEntity>();
            await Promise.all(
                data.addresses.map(async (address) => {
                    addresses.push(await this.addressRepository.update(address.id, address));
                }),
            );
        }

        delete data.newAppointments;
        delete data.updateAppointments;
        delete data.beneficiaryUserInfo;
        delete data.professionalUserInfo;
        delete data.addresses;
        return await super.update(id, data);
    }

    async updatePasswordRequest(userId: string) {
        totp.options = {
            digits: 6,
            step: 300,
        };
        const token = totp.generate(this.configService.get(EnviromentVariablesEnum.OTP_TOKEN));

        const user = await this.findById(userId);
        const otpRequest = new UserOtpRequestEntity();
        otpRequest.token = await this.hashStringData(token);
        await otpRequest.save();
        user.otpRequest = otpRequest;
        await user.save();

        await this.emailFacade.sendPasswordResetCodeEmail(token, user.email);
    }

    async verifyToken(userId: string, token: string) {
        const user = await this.findById(userId);

        if (!user.otpRequest?.token) {
            throw new BadRequestException('Nenhum pedido de recuperação de senha foi feito para este usuário.');
        }
        totp.options = {
            digits: 6,
            step: 300,
            window: 1,
        };

        try {
            const valid = totp.check(token, this.configService.get(EnviromentVariablesEnum.OTP_TOKEN));
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
        await user.otpRequest.remove();
        user.otpRequest = null;
        await user.save();
    }

    private async hashStringData(stringData: string): Promise<string> {
        return bcrypt.hash(stringData, 13);
    }
}
