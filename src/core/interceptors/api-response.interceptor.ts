import {
    CallHandler,
    ExecutionContext,
    NestInterceptor
} from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { Reflector } from "@nestjs/core";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";
import { ResponseDto } from "../dtos/response.dto";

type Response<T> = {
    success: boolean;
    data: T;
    errors: any;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private reflector: Reflector) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        if (context.getType() === "http") {
            return next.handle().pipe(
                map((data) => {
                    if (data instanceof ResponseDto) {
                        return data;
                    }
                    return new ResponseDto<T>(
                        true,
                        this.serialize(data, context),
                        null,
                    );
                }),
            );
        }
        return next.handle();
    }

    serialize(data: T, context: ExecutionContext) {
        // @SerializeOptions({
        //   type: UserResponseDto,
        //   ignoreDecorators: true,
        // })
        const reflectorLocal = this.reflector.getAllAndOverride(
            "class_serializer:options",
            [context.getClass(), context.getHandler()],
        );

        const serializationClassType = reflectorLocal?.type;

        const serializationIgnore = reflectorLocal?.ignoreDecorators || false;

        if (serializationClassType && !serializationIgnore) {
            return plainToClass(serializationClassType, data, {
                excludeExtraneousValues: true,
            }) as T;
        }

        return data;
    }
}
