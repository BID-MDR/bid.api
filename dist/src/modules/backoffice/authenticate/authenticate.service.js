"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const user_repository_1 = require("../../data-interaction/database/repositories/backoffice/user/user.repository");
const authenticate_response_dto_1 = require("./dto/authenticate-response.dto");
const environment_variables_enum_1 = require("../../../core/enums/environment-variables.enum");
const userTypeEnum_1 = require("../user/dto/userTypeEnum");
let AuthenticateService = class AuthenticateService {
    _userRepository;
    _configService;
    _jwtService;
    constructor(_userRepository, _configService, _jwtService) {
        this._userRepository = _userRepository;
        this._configService = _configService;
        this._jwtService = _jwtService;
    }
    async validate(email, password) {
        const user = await this._userRepository.getByEmail(email);
        if (user) {
            if (await bcrypt.compare(password, user.password))
                return user;
        }
        return null;
    }
    async authenticate(dto) {
        const user = await this.validate(dto.email, dto.password);
        if (!user)
            throw new common_1.NotFoundException('Invalid email and password!');
        const token = this._createToken(user.id.toString(), user.email, user.roles);
        const verify = await this._userRepository.getById(user.id.toString());
        if (verify.type === userTypeEnum_1.UserBackofficeTypeEnum.BACKOFFICE) {
            return new authenticate_response_dto_1.AuthenticateResponseDto(user.id, user.email, token.accessToken);
        }
        if (verify.lastAccess) {
            const lastAccessDate = new Date(verify.lastAccess);
            lastAccessDate.setMinutes(lastAccessDate.getMinutes() + verify.timeView);
            const dateCompare = lastAccessDate.getTime();
            const dateNow = new Date().getTime();
            if (dateCompare >= dateNow) {
                return new authenticate_response_dto_1.AuthenticateResponseDto(user.id, user.email, token.accessToken, lastAccessDate);
            }
            else {
                throw new common_1.BadRequestException('Login não autorizado');
            }
        }
        const newDate = new Date();
        const dateLastLogin = new Date(newDate.setMinutes(newDate.getMinutes() + verify.timeView));
        await this._userRepository.updateLastAccess(verify.id.toString(), new Date());
        return new authenticate_response_dto_1.AuthenticateResponseDto(user.id, user.email, token.accessToken, dateLastLogin);
    }
    _createToken(userId, email, roles) {
        const user = { userId, email, roles };
        const expiresIn = this._configService.get(environment_variables_enum_1.EnviromentVariablesEnum.JWT_ACCESS_TOKEN_EXPIRATION);
        const accessToken = this._jwtService.sign(user, { expiresIn });
        return { accessToken, expiresIn };
    }
};
exports.AuthenticateService = AuthenticateService;
exports.AuthenticateService = AuthenticateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserBackofficeRepository,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthenticateService);
//# sourceMappingURL=authenticate.service.js.map