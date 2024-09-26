"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiOkResponseDtoData = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_respose_dto_1 = require("../../dtos/api-respose.dto");
const ApiOkResponseDtoData = ({ type, description = undefined, isArray = false, status = 200, }) => {
    if (Array.isArray(type)) {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(api_respose_dto_1.ApiResponseDto, type[0]), (0, swagger_1.ApiOkResponse)({
            isArray: true,
            description: description,
            status: status,
            schema: {
                allOf: [
                    { $ref: (0, swagger_1.getSchemaPath)(api_respose_dto_1.ApiResponseDto) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: (0, swagger_1.getSchemaPath)(type[0]) },
                            },
                        },
                    },
                ],
            },
        }));
    }
    else {
        if (type) {
            return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(api_respose_dto_1.ApiResponseDto, type), (0, swagger_1.ApiOkResponse)({
                isArray,
                description: description,
                status: status,
                schema: {
                    allOf: [
                        { $ref: (0, swagger_1.getSchemaPath)(api_respose_dto_1.ApiResponseDto) },
                        {
                            properties: {
                                data: {
                                    $ref: (0, swagger_1.getSchemaPath)(type),
                                },
                            },
                        },
                    ],
                },
            }));
        }
        return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(api_respose_dto_1.ApiResponseDto), (0, swagger_1.ApiOkResponse)({
            isArray,
            description: description,
            status: status,
            schema: {
                allOf: [
                    { $ref: (0, swagger_1.getSchemaPath)(api_respose_dto_1.ApiResponseDto) },
                    {
                        properties: {
                            data: {
                                type: 'null',
                            },
                        },
                    },
                ],
            },
        }));
    }
};
exports.ApiOkResponseDtoData = ApiOkResponseDtoData;
//# sourceMappingURL=api-ok-response-dto.decorator.js.map