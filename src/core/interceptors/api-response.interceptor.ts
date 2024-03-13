import { CallHandler, ExecutionContext, HttpException, NestInterceptor, StreamableFile } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { ApiResponseDto } from '../dtos/api-respose.dto';

export class ApiReponseInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                if (data instanceof Error || data instanceof HttpException) {
                    return data;
                }

                const serializationClassType = this.reflector.getAllAndOverride('class_serializer:options', [
                    context.getClass(),
                    context.getHandler(),
                ])?.type;
                const response = new ApiResponseDto(true, data, null);

                if (serializationClassType) {
                    let dataProp = data;

                    if (typeof response !== 'object' || response instanceof StreamableFile) {
                        return response;
                    }
                    if (data.pagination) {
                        response.totalDocumentCount = data.pagination.totalDocumentCount;
                        response.skip = data.pagination.skip;
                        response.limit = data.pagination.limit;

                        if (!data.data) {
                            throw new Error('Pagination data prop not found');
                        }
                        dataProp = data.data;
                    }

                    if (Array.isArray(dataProp)) {
                        response.data = [];
                        dataProp.forEach((el) => {
                            response.data.push(plainToInstance(serializationClassType, el));
                        });
                    } else {
                        response.data = plainToInstance(serializationClassType, dataProp);
                    }
                    return response;
                }
                return response;
            }),
        );
    }
}
