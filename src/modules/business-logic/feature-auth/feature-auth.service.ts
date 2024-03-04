import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import jwkToPem from 'jwk-to-pem';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';
import CryptoUtil from 'src/core/utils/crypto.util';
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

    async signinDevBeneficiary() {
        const user = await this.userRepository.getFirstBeneficiary();

        if (!user) throw new NotFoundException();

        return new SigninResponseDto(
            await this.jwtService.signAsync({
                userId: user.id,
            } as JwtPayloadInterface),
            true,
        );
    }

    async signinDevProfessional() {
        const user = await this.userRepository.getFirstProfessional();

        if (!user) throw new NotFoundException();

        return new SigninResponseDto(
            await this.jwtService.signAsync({
                userId: user.id,
            } as JwtPayloadInterface),
            true,
        );
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
            return new SigninResponseDto(null, false, {
                cpf: decodedJwt.sub,
                email: decodedJwt.email,
                name: decodedJwt.name,
                phone: decodedJwt.phone_number,
            });
        }

        const token = await this.jwtService.signAsync({
            userId: user.id,
        } as JwtPayloadInterface);

        await this.govbrSsoRepository.update(ssoAttempt.id, {
            token: CryptoUtil.encrypt(this.configService.get(EnviromentVariablesEnum.OTP_TOKEN), token),
        });

        return ssoAttempt.id;
    }

    async govbrGetTokens(dto: GovbrTokenPayloadDto) {}

    async signinFromCreateUser(user: UserEntity): Promise<SigninResponseDto> {
        return new SigninResponseDto(
            await this.jwtService.signAsync({
                userId: user.id,
            } as JwtPayloadInterface),
            true,
        );
    }
}
