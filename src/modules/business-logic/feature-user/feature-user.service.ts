import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateUserDto } from 'src/modules/data-interaction/database/dtos/user/create-user.dto';
import { UpdateUserDto } from 'src/modules/data-interaction/database/dtos/user/update-user.dto';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user.repository';
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

@Injectable()
export class FeatureUserService extends BaseService<UserEntity, CreateUserDto, UpdateUserDto> {
    constructor(
        private repository: UserRepository,
        private readonly caubFacade: CaubFacade,
        private readonly confeaFacade: ConfeaFacade,
        private readonly emailFacade: EmailFacade,
        private readonly configService: ConfigService,
    ) {
        super(repository);
    }

    async checkProfessionalUserCaubRegistration(cpf: string): Promise<ProfessionalCouncilRegistrationResponseDto> {
        return this.caubFacade.getProfessionalRegistrationStatusFromCaub(cpf);
    }

    async checkProfessionalUserConfeaRegistration(cpf: string): Promise<ProfessionalCouncilRegistrationResponseDto> {
        return this.confeaFacade.getProfessionalRegistrationStatusFromConfea(cpf);
    }

    async findUserWithAgendaById(id: number) {
        return this.repository.findUserWithAgendaById(id);
    }

    async create(data: CreateUserDto): Promise<UserEntity> {
        data.password = await this.hashStringData(data.password);

        return await super.create(data);
    }

    async updatePasswordRequest(userId: number) {
        totp.options = {
            digits: 6,
            step: 300,
        };
        const token = totp.generate(this.configService.get(EnviromentVariablesEnum.OTP_TOKEN));

        const user = await this.findById(userId);
        const otpRequest = new UserOtpRequestEntity();
        otpRequest.token = await this.hashStringData(token);
        user.otpRequest = otpRequest;
        await user.save();

        await this.emailFacade.sendPasswordResetCodeEmail(token, user.email);
    }

    async verifyToken(userId: number, token: string) {
        const user = await this.findById(userId);

        if (!user.otpRequest?.token) {
            throw new BadRequestException('Nenhum pedido de recuperação de senha foi feito para este usuário.');
        }

        try {
            return { valid: totp.check(token, this.configService.get(EnviromentVariablesEnum.OTP_TOKEN)) };
        } catch (error) {
            if (user.otpRequest.createdAt.getTime() + 300_000 < Date.now()) {
                user.otpRequest = null;
                await user.save();
                throw new BadRequestException('Token expirado.');
            }
            return { valid: false };
        }
    }

    async confirmUpdatePasswordRequest(userId: number, dto: ConfirmPasswordUpdateRequestDto) {
        const user = await this.findById(userId);

        if (!user.otpRequest?.token) {
            throw new BadRequestException('Nenhum pedido de recuperação de senha foi feito para este usuário.');
        }

        if (user.otpRequest.createdAt.getTime() + 300_000 < Date.now()) {
            throw new BadRequestException('Token expirado.');
        }

        if (user.otpRequest.status === UserOtpStatusEnum.PENDING) {
            throw new BadRequestException('Token ainda não foi verificado.');
        }

        user.password = await this.hashStringData(dto.password);
        user.otpRequest = null;
        await user.save();
    }

    private async hashStringData(stringData: string): Promise<string> {
        return bcrypt.hash(stringData, 13);
    }
}
