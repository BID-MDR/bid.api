/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { ErrorApiResponseInterface } from '../interfaces/error-api-response.interface';
import { ApiResponseDto } from '../dtos/api-respose.dto';
import { ValidationError, isArray } from 'class-validator';
import { switchInheritance } from '../dsl/switch-inheritance.dsl';

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
