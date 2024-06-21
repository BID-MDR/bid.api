import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../../dtos/api-respose.dto';

export const ApiOkResponseDtoData = <
    DataDto extends Type<unknown>[] | Type<unknown> | null,
>({
    type,
    description = undefined,
    status = 200,
}: {
    type: DataDto;
    description?: string;
    status?: number;
}) => {
    if (Array.isArray(type)) {
        return applyDecorators(
            ApiExtraModels(ApiResponseDto, type[0]),
            ApiOkResponse({
                description: description,
                status: status,
                schema: {
                    allOf: [
                        { $ref: getSchemaPath(ApiResponseDto) },
                        {
                            properties: {
                                data: {
                                    type: 'array',
                                    items: { $ref: getSchemaPath(type[0]) },
                                },
                            },
                        },
                    ],
                },
            }),
        );
    } else {
        if (type) {
            return applyDecorators(
                ApiExtraModels(ApiResponseDto, type),
                ApiOkResponse({
                    description: description,
                    status: status,
                    schema: {
                        allOf: [
                            { $ref: getSchemaPath(ApiResponseDto) },
                            {
                                properties: {
                                    data: {
                                        $ref: getSchemaPath(type),
                                    },
                                },
                            },
                        ],
                    },
                }),
            );
        }
        return applyDecorators(
            ApiExtraModels(ApiResponseDto),
            ApiOkResponse({
                description: description,
                status: status,
                schema: {
                    allOf: [
                        { $ref: getSchemaPath(ApiResponseDto) },
                        {
                            properties: {
                                data: {
                                    type: 'null',
                                },
                            },
                        },
                    ],
                },
            }),
        );
    }
};
