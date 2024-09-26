"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const core_1 = require("@nestjs/core");
const class_transformer_1 = require("class-transformer");
const rxjs_1 = require("rxjs");
const response_dto_1 = require("../dtos/response.dto");
let ResponseInterceptor = class ResponseInterceptor {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        if (context.getType() === "http") {
            return next.handle().pipe((0, rxjs_1.map)((data) => {
                if (data instanceof response_dto_1.ResponseDto) {
                    return data;
                }
                return new response_dto_1.ResponseDto(true, this.serialize(data, context), null);
            }));
        }
        return next.handle();
    }
    serialize(data, context) {
        const reflectorLocal = this.reflector.getAllAndOverride("class_serializer:options", [context.getClass(), context.getHandler()]);
        const serializationClassType = reflectorLocal?.type;
        const serializationIgnore = reflectorLocal?.ignoreDecorators || false;
        if (serializationClassType && !serializationIgnore) {
            return (0, class_transformer_1.plainToClass)(serializationClassType, data, {
                excludeExtraneousValues: true,
            });
        }
        return data;
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ResponseInterceptor);
//# sourceMappingURL=api-response.interceptor.js.map