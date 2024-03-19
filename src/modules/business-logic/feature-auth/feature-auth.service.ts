import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';
import CryptoUtil from 'src/core/utils/crypto.util';
import { GovbrSsoInfoToRegisterEntity } from 'src/modules/data-interaction/database/entitites/govbr-sso-info-to-register.entity';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
import { GovbrSsoRepository } from 'src/modules/data-interaction/database/repositories/govbr-sso.repository';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { GovbrFacade } from 'src/modules/data-interaction/facade/apis/gov/govbr/govbr.facade';
import { GovbrTokenPayloadDto } from './dtos/govbr-token-payload.dto';
import { SigninRequestDto } from './dtos/signin-request.dto';
import { SigninResponseDto } from './dtos/signin-response.dto';

@Injectable()
export class FeatureAuthService {
    constructor(
        private govbrFacade: GovbrFacade,
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private govbrSsoRepository: GovbrSsoRepository,
        private configService: ConfigService,
    ) {}

    async generateSsoGovbr() {
        const pkce_lib = await import('pkce-challenge');
        const pkce = await pkce_lib.default();

        return await this.govbrSsoRepository.create({
            codeVerifier: pkce.code_verifier,
            codeChallenge: pkce.code_challenge,
        });
    }

    async getSsoId(id: string) {
        const ssoAttempt = await this.govbrSsoRepository.findById(id);

        if (!ssoAttempt) {
            throw new NotFoundException('Tentativa de SSO não encontrada.');
        }

        const returnData = new SigninResponseDto(ssoAttempt.token, ssoAttempt.registered, ssoAttempt.infoToRegister);

        // await this.govbrSsoRepository.hardDelete(id);

        return returnData;
    }

    async govbrAuthorize(dto: SigninRequestDto) {
        const ssoAttempt = await this.govbrSsoRepository.findById(dto.state);

        if (!ssoAttempt) {
            throw new BadRequestException('State invalidado pelo backend.');
        }

        const govbrData = await this.govbrFacade.login(dto.code, ssoAttempt.codeVerifier);

        const jwk = await this.govbrFacade.getJwk();

        // await this.jwtService.verifyAsync(govbrData.access_token, {
        //     publicKey: jwkToPem(jwk),
        //     algorithms: ['RS256'],
        // });
        // await this.jwtService.verifyAsync(govbrData.id_token, {
        //     publicKey: jwkToPem(jwk),
        //     algorithms: ['RS256'],
        // });

        const decodedJwt = this.jwtService.decode(govbrData.id_token);
        const user = await this.userRepository.findByCpf(decodedJwt.sub);

        if (!user) {
            ssoAttempt.infoToRegister = new GovbrSsoInfoToRegisterEntity(
                decodedJwt.name,
                decodedJwt.sub,
                decodedJwt.email,
                decodedJwt.phone_number,
            );
            await ssoAttempt.save();
            return ssoAttempt.id;
        }

        const token = await this.jwtService.signAsync({
            userId: user.id,
            userType: user.type,
        } as JwtPayloadInterface);

        await this.govbrSsoRepository.update(ssoAttempt.id, {
            token: token,
            registered: true,
        });

        return ssoAttempt.id;
    }

    async govbrGetTokens(dto: GovbrTokenPayloadDto) {}

    async signinFromCreateUser(user: UserEntity): Promise<SigninResponseDto> {
        return new SigninResponseDto(
            await this.jwtService.signAsync({
                userId: user.id,
                userType: user.type,
            } as JwtPayloadInterface),
            true,
        );
    }
}
