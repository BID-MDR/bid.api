"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiBodyEncripted = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_respose_dto_1 = require("../../dtos/api-respose.dto");
const ApiBodyEncripted = (options) => {
    if (process.env['NODE_ENV'] === 'development') {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(api_respose_dto_1.ApiResponseDto, options.type), (0, swagger_1.ApiBody)({
            schema: {
                allOf: [{ $ref: (0, swagger_1.getSchemaPath)(options.type) }],
            },
        }));
    }
    else {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(api_respose_dto_1.ApiResponseDto, options.type), (0, swagger_1.ApiBody)({
            description: options.description + '. Criptografe o payload com AES-256.',
            schema: {
                properties: {
                    payload: {
                        type: 'string',
                    },
                },
            },
        }));
    }
};
exports.ApiBodyEncripted = ApiBodyEncripted;
//# sourceMappingURL=api-body-encripted.decorator.js.map