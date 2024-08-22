/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { TypeORMError } from 'typeorm';
import { switchInheritance } from '../dsl/switch-inheritance.dsl';
import { ApiResponseDto } from '../dtos/api-respose.dto';
import { ErrorApiResponseInterface } from '../interfaces/error-api-response.interface';

@Catch()
export class ServerExceptionFilter implements ExceptionFilter {
    catch(exception: unknown | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let message = (exception as any).message;
        let code = 'HttpException';
        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        Logger.error(message, `${request.method} ${request.url}`);

        if (process.env.NODE_ENV === 'development') {
            console.error(exception);
        }

        switchInheritance(exception)
            .ofType(TypeORMError)
            .do(() => {
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = (exception as TypeORMError).message;
                code = (exception as any).code;
            })
            .ofType(HttpException)
            .do(() => {
                status = (exception as HttpException).getStatus();
                message = (exception as HttpException).getResponse()['message'];
                code = (exception as HttpException).message;
            })
            .ofType(Error)
            .do(() => {
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                message = 'Internal server error';
                code = 'InternalServerError';
            });

        response
            .status(status)
            .json(new ApiResponseDto(false, null, [this.GlobalResponseError(status, message, code, request)]));
    }

    GlobalResponseError: (
        statusCode: number,
        message: string,
        code: string,
        request: Request,
    ) => ErrorApiResponseInterface = (
        statusCode: number,
        message: string,
        code: string,
        request: Request,
    ): ErrorApiResponseInterface => {
        return {
            statusCode: statusCode,
            message,
            code,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        };
    };
}
