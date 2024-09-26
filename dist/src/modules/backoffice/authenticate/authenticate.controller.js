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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthenticateController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../core/dtos/response.dto");
const authenticate_request_dto_1 = require("./dto/authenticate-request.dto");
const authenticate_service_1 = require("./authenticate.service");
let AuthenticateController = AuthenticateController_1 = class AuthenticateController {
    _authenticateService;
    _logger = new common_1.Logger(AuthenticateController_1.name);
    constructor(_authenticateService) {
        this._authenticateService = _authenticateService;
    }
    async authenticate(dto) {
        try {
            const response = await this._authenticateService.authenticate(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AuthenticateController = AuthenticateController;
__decorate([
    (0, common_1.Post)('/authenticate'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authenticate_request_dto_1.AuthenticateRequestDto]),
    __metadata("design:returntype", Promise)
], AuthenticateController.prototype, "authenticate", null);
exports.AuthenticateController = AuthenticateController = AuthenticateController_1 = __decorate([
    (0, swagger_1.ApiTags)('Authenticate Backoffice'),
    (0, common_1.Controller)('authenticate-backoffice'),
    __metadata("design:paramtypes", [authenticate_service_1.AuthenticateService])
], AuthenticateController);
//# sourceMappingURL=authenticate.controller.js.map