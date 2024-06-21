import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';

@Injectable()
export class SocketGuard implements CanActivate {
    constructor(private configService: ConfigService) {}

    canActivate(context: ExecutionContext) {
        try {
            jwt.verify(
                context.getArgByIndex(0).handshake.auth.Authorization.replace('Bearer ', ''),
                this.configService.get(EnviromentVariablesEnum.JWT_PAYLOAD_KEY),
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    handleRequest(err, user, info) {
        if (err || !user) throw err || new WsException('Credenciais inválidas!');

        return user;
    }
}
