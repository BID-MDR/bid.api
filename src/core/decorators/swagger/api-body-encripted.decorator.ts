import { Type, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiBodyOptions, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../../dtos/api-respose.dto';

type ApiBodyType = ApiBodyOptions & { type: Type<unknown> };

export const ApiBodyEncripted = (options: ApiBodyType) => {
    if (process.env['NODE_ENV'] === 'development') {
        return applyDecorators(
            ApiExtraModels(ApiResponseDto, options.type),
            ApiBody({
                schema: {
                    allOf: [{ $ref: getSchemaPath(options.type) }],
                },
            }),
        );
    } else {
        return applyDecorators(
            ApiExtraModels(ApiResponseDto, options.type),
            ApiBody({
                description: options.description + '. Criptografe o payload com AES-256.',
                schema: {
                    properties: {
                        payload: {
                            type: 'string',
                        },
                    },
                },
            }),
        );
    }
};
