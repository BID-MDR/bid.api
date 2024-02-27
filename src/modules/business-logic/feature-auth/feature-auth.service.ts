import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import jwkToPem from 'jwk-to-pem';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { GovbrFacade } from 'src/modules/data-interaction/facade/apis/gov/govbr/govbr.facade';
import { GovbrTokenPayloadDto } from './dtos/govbr-token-payload.dto';
import { SigninRequestDto } from './dtos/signin-request.dto';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
import { GovbrSsoRepository } from 'src/modules/data-interaction/database/repositories/govbr-sso.repository';
import { randomBytes, createHash } from 'node:crypto';
import CryptoUtil from 'src/core/utils/crypto.util';
import { ConfigService } from '@nestjs/config';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';

@Injectable()
export class FeatureAuthService {
    constructor(
        private govbrFacade: GovbrFacade,
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private eventEmitter: EventEmitter2,
        private govbrSsoRepository: GovbrSsoRepository,
        private configService: ConfigService,
    ) {}

    async generateSsoGovbr() {
        const codeVerifier = randomBytes(32)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');

        return await this.govbrSsoRepository.create({
            codeVerifier,
            codeChallenge: encodeURI(createHash('sha256').update(codeVerifier).digest('base64')),
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

    async signin(dto: SigninRequestDto) {
        const ssoAttempt = await this.govbrSsoRepository.findById(dto.state);

        if (!ssoAttempt) {
            throw new BadRequestException('State inválidado pelo backend.');
        }

        await this.govbrFacade.login(dto.code, ssoAttempt.codeVerifier);
        const tokens: GovbrTokenPayloadDto = await new Promise((resolve, reject) => {
            const listener = (data: GovbrTokenPayloadDto) => {
                clearTimeout(timer);
                this.eventEmitter.removeListener('govbrTokens', listener);
                resolve(data);
            };

            this.eventEmitter.on('govbrTokens', listener);

            const timer = setTimeout(() => {
                this.eventEmitter.removeListener('govbrTokens', listener);
                reject(new HttpException('Sem resposta do Govbr.', HttpStatus.REQUEST_TIMEOUT));
            }, 10_000);
        });
        const decodedJwt = this.jwtService.decode(tokens.id_token);
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

    async signinFromCreateUser(user: UserEntity): Promise<SigninResponseDto> {
        return new SigninResponseDto(
            await this.jwtService.signAsync({
                userId: user.id,
            } as JwtPayloadInterface),
            true,
        );
    }

    async processGovbrJwt(dto: GovbrTokenPayloadDto) {
        const jwk = await this.govbrFacade.getJwk();
        await this.jwtService.verifyAsync(dto.access_token, {
            publicKey: jwkToPem(jwk),
        });
        await this.jwtService.verifyAsync(dto.id_token, {
            publicKey: jwkToPem(jwk),
        });
        this.eventEmitter.emit('govbrTokens', dto);
    }
}
