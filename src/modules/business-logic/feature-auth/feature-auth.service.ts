import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class FeatureAuthService {
    constructor(
        private govbrFacade: GovbrFacade,
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private eventEmitter: EventEmitter2,
    ) {}

    async signin(dto: SigninRequestDto): Promise<SigninResponseDto> {
        await this.govbrFacade.login(dto.code, dto.codeVerifier);
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

        return new SigninResponseDto(
            await this.jwtService.signAsync({
                userId: user.id,
            } as JwtPayloadInterface),
            true,
        );
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
