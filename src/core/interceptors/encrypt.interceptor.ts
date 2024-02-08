/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import CryptoUtil from '../utils/crypto.util';
import { EnviromentVariablesEnum } from './../enums/environment-variables.enum';

export class EncryptInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const payloadKey = process.env[EnviromentVariablesEnum.PAYLOAD_ENCRYPT_KEY] || '';
        const payload = context.switchToHttp().getRequest().body.payload;

        if (process.env[EnviromentVariablesEnum.NODE_ENV] !== 'production') {
            return next.handle();
        }

        if (!payload) throw new HttpException('Payload é obrigatório!', HttpStatus.BAD_REQUEST);

        const decryptedBody = JSON.parse(
            CryptoUtil.decrypt(payloadKey, context.switchToHttp().getRequest().body.payload) || '',
        );

        if (!decryptedBody) throw new HttpException('Erro ao descriptografar o payload!', HttpStatus.BAD_REQUEST);

        context.switchToHttp().getRequest().body = decryptedBody;

        return next.handle();
    }
}
