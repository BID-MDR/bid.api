import { Type, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../../dtos/api-respose.dto';

export const ApiBodyEncripted = <RequestDto extends Type<unknown>>({
    type,
}: {
    type: RequestDto;
}) => {
    if (process.env['NODE_ENV'] === 'development') {
        return applyDecorators(
            ApiExtraModels(ApiResponseDto, type),
            ApiBody({
                description:
                    'For localhost environments, send the payload in plain text.',
                schema: {
                    allOf: [{ $ref: getSchemaPath(type) }],
                },
            }),
        );
    } else {
        return applyDecorators(
            ApiExtraModels(ApiResponseDto, type),
            ApiBody({
                description:
                    'For production environments, send the payload in plain text and encrypted with AES-256',
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
