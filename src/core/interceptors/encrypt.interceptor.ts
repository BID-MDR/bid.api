/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnviromentVariablesEnum } from './../enums/environment-variables.enum';
import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import CryptoUtil from '../utils/crypto.util';
import { ApiResponseDto } from '../dtos/api-respose.dto';

export class EncryptInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const payloadKey =
            process.env[EnviromentVariablesEnum.PAYLOAD_ENCRYPT_KEY] || '';
        const payload = context.switchToHttp().getRequest().body.payload;

        if (process.env[EnviromentVariablesEnum.ENABLE_DOCS] === 'true') {
            if (
                context
                    .switchToHttp()
                    .getRequest()
                    .headers.origin.match(
                        new RegExp(
                            `http://localhost:${process.env['PORT']}/v[\\S]+/docs`,
                            'g',
                        ),
                    )
            ) {
                return next.handle();
            }
        }

        if (process.env[EnviromentVariablesEnum.NODE_ENV] !== 'production') {
            if (
                context
                    .switchToHttp()
                    .getRequest()
                    .headers.origin.match(new RegExp(`http://localhost`, 'g'))
            ) {
                return next.handle();
            }
        }

        if (!payload)
            throw new HttpException(
                new ApiResponseDto(false, null, [
                    {
                        message: 'payload is mandatory!',
                        path: context.switchToHttp().getRequest().url,
                        statusCode: HttpStatus.BAD_REQUEST,
                        timestamp: new Date().toISOString(),
                    },
                ]),
                HttpStatus.BAD_REQUEST,
            );

        const decryptedBody = JSON.parse(
            CryptoUtil.decrypt(
                payloadKey,
                context.switchToHttp().getRequest().body.payload,
            ) || '',
        );

        if (!decryptedBody)
            throw new HttpException(
                new ApiResponseDto(false, null, [
                    {
                        message: 'error trying to decrypt the payload!',
                        path: context.switchToHttp().getRequest().url,
                        statusCode: HttpStatus.BAD_REQUEST,
                        timestamp: new Date().toISOString(),
                    },
                ]),
                HttpStatus.BAD_REQUEST,
            );

        context.switchToHttp().getRequest().body = decryptedBody;

        return next.handle();
    }
}
