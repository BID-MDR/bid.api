import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { EnviromentVariablesEnum } from '../enums/environment-variables.enum';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(EnviromentVariablesEnum.JWT_PAYLOAD_KEY),
        });
    }

    async validate(payload: JwtPayloadInterface) {
        if (!!!payload) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
