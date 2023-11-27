/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { isAxiosError } from 'axios';
import { Request, Response } from 'express';
import { EnviromentVariablesEnum } from '../enums/environment-variables.enum';
import { ApiResponseDto } from '../dtos/api-respose.dto';

@Catch()
export class ServerExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = 'status' in exception ? exception.getStatus() : 500;
        const message = this.formulateExceptionMessage(exception);

        if (
            process.env[EnviromentVariablesEnum.NODE_ENV] === 'development' ||
            process.env[EnviromentVariablesEnum.NODE_ENV] === 'homologation'
        ) {
            console.error(exception);
        }

        response.status(status).json(
            new ApiResponseDto(false, null, [
                {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: message,
                },
            ]),
        );
    }

    private formulateExceptionMessage(exception: any) {
        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse() as any;
            return exceptionResponse?.message ?? exceptionResponse;
        }
        if (exception instanceof Error) {
            return exception.name + exception.message;
        }
        if (isAxiosError(exception)) {
            return (
                exception.response?.data ?? exception.name + exception.message
            );
        }
    }
}
