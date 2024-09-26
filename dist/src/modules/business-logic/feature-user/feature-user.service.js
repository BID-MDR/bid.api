"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureUserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const otplib_1 = require("otplib");
const environment_variables_enum_1 = require("../../../core/enums/environment-variables.enum");
const base_service_1 = require("../../../core/services/base.service");
const common_property_transfer_util_1 = require("../../../core/utils/common-property-transfer.util");
const user_otp_request_entity_1 = require("../../data-interaction/database/entitites/user-otp-request.entity");
const user_otp_enum_1 = require("../../data-interaction/database/enums/user-otp.enum");
const address_repository_1 = require("../../data-interaction/database/repositories/address.repository");
const user_appointment_repository_1 = require("../../data-interaction/database/repositories/user/user-appointment.repository");
const user_beneficiary_info_repository_1 = require("../../data-interaction/database/repositories/user/user-beneficiary-info.repository");
const user_professional_info_repository_1 = require("../../data-interaction/database/repositories/user/user-professional-info.repository");
const user_resting_day_repository_1 = require("../../data-interaction/database/repositories/user/user-resting-day.repository");
const user_repository_1 = require("../../data-interaction/database/repositories/user/user.repository");
const email_facade_1 = require("../../data-interaction/facade/apis/email/email.facade");
const caub_facade_1 = require("../../data-interaction/facade/apis/gov/caubr/caub.facade");
const confea_facade_1 = require("../../data-interaction/facade/apis/gov/confea/confea.facade");
const storage_facade_1 = require("../../data-interaction/facade/apis/storage/storage.facade");
let FeatureUserService = class FeatureUserService extends base_service_1.BaseService {
    userRepository;
    userAppointmentRepository;
    userBeneficiaryInfoRepository;
    userProfessionalInfoRepository;
    userRestingdayRepository;
    addressRepository;
    caubFacade;
    confeaFacade;
    emailFacade;
    storageFacade;
    configService;
    constructor(userRepository, userAppointmentRepository, userBeneficiaryInfoRepository, userProfessionalInfoRepository, userRestingdayRepository, addressRepository, caubFacade, confeaFacade, emailFacade, storageFacade, configService) {
        super(userRepository);
        this.userRepository = userRepository;
        this.userAppointmentRepository = userAppointmentRepository;
        this.userBeneficiaryInfoRepository = userBeneficiaryInfoRepository;
        this.userProfessionalInfoRepository = userProfessionalInfoRepository;
        this.userRestingdayRepository = userRestingdayRepository;
        this.addressRepository = addressRepository;
        this.caubFacade = caubFacade;
        this.confeaFacade = confeaFacade;
        this.emailFacade = emailFacade;
        this.storageFacade = storageFacade;
        this.configService = configService;
    }
    async checkProfessionalUserCaubRegistration(cpf) {
        return this.caubFacade.getProfessionalRegistrationStatusFromCaub(cpf);
    }
    async checkProfessionalUserConfeaRegistration(cpf) {
        return this.confeaFacade.getProfessionalRegistrationStatusFromConfea(cpf);
    }
    async create(data) {
        data.password = await this.hashStringData(data.password);
        if (typeof data.profilePicture !== 'string') {
            data.profilePicture = await this.storageFacade.uploadMedia(data.uploadedProfilePicture.mimeType, data.uploadedProfilePicture.fileName, data.uploadedProfilePicture.data);
        }
        return await super.create(data);
    }
    async updateById(id, data) {
        const user = await this.userRepository.findById(id);
        if (data.IUser.paramToBeUpdated === 'personal_info') {
            const { address, ...rest } = data.IUser;
            return await this.userRepository.update(id, rest);
        }
        else if (data.IUser.paramToBeUpdated === 'address') {
            const { address, ...rest } = data.IUser;
            return await this.addressRepository.update(user.address.id, data.IUser.address);
        }
        else {
        }
    }
    async updateUserProgramTypeDto(id, dto) {
        return await this.userRepository.updateUserProgramType(id, dto.programType);
    }
    async update(id, data) {
        const user = await this.findById(id);
        if (data.newAppointments || data.updateAppointments) {
            let appointments = new Array();
            if (data.newAppointments) {
                if (await this.userAppointmentRepository.areDatesWithinAnyAppointment(data.newAppointments.map((a) => a.from).concat(data.newAppointments.map((a) => a.to)))) {
                    throw new common_1.BadRequestException('Data já está ocupada.');
                }
                for (const iterator of await this.userAppointmentRepository.createMany(data.newAppointments)) {
                    iterator.user = user;
                    await iterator.save();
                    appointments.push(iterator);
                }
            }
            if (data.updateAppointments) {
                if (await this.userAppointmentRepository.areDatesWithinAnyAppointment(data.updateAppointments.map((a) => a.from).concat(data.updateAppointments.map((a) => a.to)))) {
                    throw new common_1.BadRequestException('Data já está ocupada.');
                }
                await Promise.all(data.updateAppointments.map(async (appointment) => {
                    appointments.push(await this.userAppointmentRepository.update(appointment.id, appointment));
                }));
            }
            user.appointments = appointments;
        }
        if (data.beneficiaryUserInfo) {
            await this.userBeneficiaryInfoRepository.update(data.beneficiaryUserInfo.id, data.beneficiaryUserInfo);
        }
        if (data.professionalUserInfo) {
            user.professionalUserInfo = (0, common_property_transfer_util_1.commonPropertyTransfer)(data.professionalUserInfo, user.professionalUserInfo);
            if (data.professionalUserInfo.restingDays) {
                const oldRestingDays = await this.userRestingdayRepository.findAllByUserProfessionalInfoId(data.professionalUserInfo.id);
                for (const iterator of oldRestingDays) {
                    await this.userRestingdayRepository.hardDelete(iterator.id);
                }
                const newRestingDays = await this.userRestingdayRepository.createMany(data.professionalUserInfo.restingDays);
                for (const iterator of newRestingDays) {
                    iterator.userProfessionalInfo = user.professionalUserInfo;
                    await iterator.save();
                }
                delete data.professionalUserInfo.restingDays;
            }
            if (data.professionalUserInfo.addresses) {
                const oldAddresses = await this.addressRepository.findAllByUserProfessionalInfoId(data.professionalUserInfo.id);
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
    async updateAddress(dto) {
        const update = await this.addressRepository.update(dto.id, dto);
        return update;
    }
    async updateProfilePicture(userId, dto) {
        let user = await this.userRepository.getById(userId);
        const media = await this.storageFacade.uploadMedia(dto.mimeType, dto.fileName, dto.data);
        const result = await this.userRepository.updateProfilePicture(userId, media);
        return result;
    }
    async updatePasswordRequest(userId) {
        otplib_1.totp.options = {
            digits: 6,
            step: 300,
        };
        const token = otplib_1.totp.generate(this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.OTP_TOKEN));
        const user = await this.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const otpRequest = new user_otp_request_entity_1.UserOtpRequestEntity();
        otpRequest.token = await this.hashStringData(token);
        otpRequest.user = user;
        await otpRequest.save();
        user.otpRequest = otpRequest;
        await user.save();
        await this.emailFacade.sendPasswordResetCodeEmail(token, user.email);
    }
    async verifyToken(userId, token) {
        const user = await this.findById(userId);
        otplib_1.totp.options = {
            digits: 6,
            step: 300,
            window: 1,
        };
        try {
            const valid = otplib_1.totp.check(token, this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.OTP_TOKEN));
            console.log(valid, '<--');
            if (valid) {
                user.otpRequest.status = user_otp_enum_1.UserOtpStatusEnum.VERIFIED;
                await user.otpRequest.save();
            }
            else if (user.otpRequest.createdAt.getTime() + 300_000 < Date.now()) {
                await user.otpRequest.remove();
                user.otpRequest = null;
                await user.save();
                throw new common_1.BadRequestException('Token expirado.');
            }
            return { valid };
        }
        catch (error) {
            if (user.otpRequest.createdAt.getTime() + 300_000 < Date.now()) {
                await user.otpRequest.remove();
                user.otpRequest = null;
                await user.save();
                throw new common_1.BadRequestException('Token expirado.');
            }
            return { valid: false };
        }
    }
    async confirmUpdatePasswordRequest(userId, dto) {
        const user = await this.findById(userId);
        if (!user.otpRequest?.token) {
            throw new common_1.BadRequestException('Nenhum pedido de recuperação de senha foi feito para este usuário.');
        }
        if (user.otpRequest.createdAt.getTime() + 300_000 < Date.now() &&
            user.otpRequest.status === user_otp_enum_1.UserOtpStatusEnum.PENDING) {
            throw new common_1.BadRequestException('Token expirado.');
        }
        if (user.otpRequest.status === user_otp_enum_1.UserOtpStatusEnum.PENDING) {
            throw new common_1.BadRequestException('Token ainda não foi verificado.');
        }
        user.password = await this.hashStringData(dto.password);
        user.otpRequest = null;
        await user.save();
    }
    async list() {
        return await this.userRepository.list();
    }
    async listBeneficiary() {
        return await this.userRepository.listBeneficiary();
    }
    async listBeneficiaryByMonth(month) {
        return await this.userRepository.findMonth(month);
    }
    async getByCpf(cpf) {
        return await this.userRepository.findByCpf(cpf);
    }
    async hashStringData(stringData) {
        return bcrypt.hash(stringData, 13);
    }
    async getDashboardDataWithJoinBeneficiary(userId) {
        return await this.userRepository.getDashboardDataWithJoinBeneficiary(userId);
    }
    async getDashboardDataWithJoinProfessional(userId) {
        return await this.userRepository.getDashboardDataWithJoinProfessional(userId);
    }
};
exports.FeatureUserService = FeatureUserService;
exports.FeatureUserService = FeatureUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_appointment_repository_1.UserAppointmentRepository,
        user_beneficiary_info_repository_1.UserBeneficiaryInfoRepository,
        user_professional_info_repository_1.UserProfessionalInfoRepository,
        user_resting_day_repository_1.UseRestingDayRepository,
        address_repository_1.AddressRepository,
        caub_facade_1.CaubFacade,
        confea_facade_1.ConfeaFacade,
        email_facade_1.EmailFacade,
        storage_facade_1.StorageFacade,
        config_1.ConfigService])
], FeatureUserService);
//# sourceMappingURL=feature-user.service.js.map