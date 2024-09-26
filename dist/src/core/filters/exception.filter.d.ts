import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request } from 'express';
import { ErrorApiResponseInterface } from '../interfaces/error-api-response.interface';
export declare class ServerExceptionFilter implements ExceptionFilter {
    catch(exception: unknown | Error, host: ArgumentsHost): void;
    GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => ErrorApiResponseInterface;
}
