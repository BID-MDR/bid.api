import { WsException } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';

@Injectable()
export class ChatService {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

    async authenticateUser(socket: Socket) {
        try {
            const jwtKeyWithoutPrefix = (socket.handshake.auth.Authorization as string).split(' ')[1];
            this.jwtService.verify(
                jwtKeyWithoutPrefix,
                this.configService.get(EnviromentVariablesEnum.JWT_PAYLOAD_KEY),
            );
            const payload = this.jwtService.decode<JwtPayloadInterface>(jwtKeyWithoutPrefix);
        } catch (error) {
            socket.disconnect();
            throw new WsException('Credenciais inválidas!');
        }
    }
}
