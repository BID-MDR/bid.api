"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const switch_inheritance_dsl_1 = require("../dsl/switch-inheritance.dsl");
const api_respose_dto_1 = require("../dtos/api-respose.dto");
let ServerExceptionFilter = class ServerExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let message = exception.message;
        let code = 'HttpException';
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        common_1.Logger.error(message, `${request.method} ${request.url}`);
        if (process.env.NODE_ENV === 'development') {
            console.error(exception);
        }
        (0, switch_inheritance_dsl_1.switchInheritance)(exception)
            .ofType(typeorm_1.TypeORMError)
            .do(() => {
            status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
            message = exception.message;
            code = exception.code;
        })
            .ofType(common_1.HttpException)
            .do(() => {
            status = exception.getStatus();
            message = exception.getResponse()['message'];
            code = exception.message;
        })
            .ofType(Error)
            .do(() => {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal server error';
            code = 'InternalServerError';
        });
        response
            .status(status)
            .json(new api_respose_dto_1.ApiResponseDto(false, null, [this.GlobalResponseError(status, message, code, request)]));
    }
    GlobalResponseError = (statusCode, message, code, request) => {
        return {
            statusCode: statusCode,
            message,
            code,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        };
    };
};
exports.ServerExceptionFilter = ServerExceptionFilter;
exports.ServerExceptionFilter = ServerExceptionFilter = __decorate([
    (0, common_1.Catch)()
], ServerExceptionFilter);
//# sourceMappingURL=exception.filter.js.map