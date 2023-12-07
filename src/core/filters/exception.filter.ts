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
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ErrorApiResponseInterface } from '../interfaces/error-api-response.interface';
import { ApiResponseDto } from '../dtos/api-respose.dto';
import { ValidationError } from 'class-validator';

@Catch()
export class ServerExceptionFilter implements ExceptionFilter {
    catch(exception: unknown | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let message = (exception as any).message;
        let code = 'HttpException';

        Logger.error(message, `${request.method} ${request.url}`);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        console.log(exception.constructor);

        switch (exception.constructor) {
            case QueryFailedError: // this is a TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = (exception as QueryFailedError).message;
                code = (exception as any).code;
                break;
            case EntityNotFoundError: // this is another TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = (exception as EntityNotFoundError).message;
                code = (exception as any).code;
                break;
            case CannotCreateEntityIdMapError: // and another
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = (exception as CannotCreateEntityIdMapError).message;
                code = (exception as any).code;
                break;
            default:
                if ('status' in (exception as any)) {
                    status = (exception as HttpException).getStatus();
                    message = (exception as HttpException).message;
                    console.log((exception as any).response);
                } else {
                    status = HttpStatus.INTERNAL_SERVER_ERROR;
                }
        }

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
