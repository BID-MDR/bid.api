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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("@nestjs/config");
const base_service_1 = require("../../../core/services/base.service");
const user_repository_1 = require("../../data-interaction/database/repositories/backoffice/user/user.repository");
const email_facade_1 = require("../../data-interaction/facade/apis/email/email.facade");
const caub_facade_1 = require("../../data-interaction/facade/apis/gov/caubr/caub.facade");
const confea_facade_1 = require("../../data-interaction/facade/apis/gov/confea/confea.facade");
const storage_facade_1 = require("../../data-interaction/facade/apis/storage/storage.facade");
const user_roles_repository_1 = require("../../data-interaction/database/repositories/backoffice/user/user-roles.repository");
const environment_variables_enum_1 = require("../../../core/enums/environment-variables.enum");
const email_repository_1 = require("../../data-interaction/database/repositories/backoffice/email/email.repository");
let UserService = class UserService extends base_service_1.BaseService {
    userBackofficeRepository;
    userRoleBackofficeRepository;
    caubFacade;
    confeaFacade;
    emailFacade;
    emailRepository;
    storageFacade;
    configService;
    constructor(userBackofficeRepository, userRoleBackofficeRepository, caubFacade, confeaFacade, emailFacade, emailRepository, storageFacade, configService) {
        super(userBackofficeRepository);
        this.userBackofficeRepository = userBackofficeRepository;
        this.userRoleBackofficeRepository = userRoleBackofficeRepository;
        this.caubFacade = caubFacade;
        this.confeaFacade = confeaFacade;
        this.emailFacade = emailFacade;
        this.emailRepository = emailRepository;
        this.storageFacade = storageFacade;
        this.configService = configService;
    }
    async create(data) {
        if (data.password) {
            data.password = await this.hashStringData(data.password);
        }
        data.roles = [];
        for (let i = 0; i < data.rolesId.length; i++) {
            let role = await this.userRoleBackofficeRepository.findById(data.rolesId[i]);
            if (role) {
                data.roles.push(role);
            }
            else
                throw new common_1.BadRequestException("Role não encontrada.");
        }
        const user = await super.create(data);
        const linkPaiel = await this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.PAINEL_LINK);
        const linkUrl = `${linkPaiel}/auth/first-access/${user.id.toString()}`;
        const message = `Seja bem vindo a plataforma, para realizar o cadastro de sua senha clique <a href="${linkUrl}" target="_blank">aqui</a>`;
        await this.emailRepository.send(user.email, 'BID', message, message);
        return user;
    }
    async firstAccess(userId, data) {
        const user = await this.userBackofficeRepository.getById(userId);
        if (!user) {
            throw new common_1.BadRequestException('User not found!');
        }
        if (user.password) {
            throw new common_1.BadRequestException('User already password!');
        }
        data.password = await this.hashStringData(data.password);
        return await this.userBackofficeRepository.registerPassword(userId, data);
    }
    async hashStringData(stringData) {
        return bcrypt.hash(stringData, 13);
    }
    async getByPayload(payload) {
        return await this.userBackofficeRepository.findById(payload.userId);
    }
    async getByEmail(email) {
        return await this.userBackofficeRepository.getByEmail(email);
    }
    async update(id, data) {
        const user = await this.userBackofficeRepository.getById(id);
        user.roles = [];
        await user.save();
        for (let i = 0; i < data.rolesId.length; i++) {
            let role = await this.userRoleBackofficeRepository.findById(data.rolesId[i]);
            if (role) {
                user.roles.push(role);
            }
            else
                throw new common_1.BadRequestException("Role não encontrada.");
        }
        return await user.save();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserBackofficeRepository,
        user_roles_repository_1.UserRolesBackofficeRepository,
        caub_facade_1.CaubFacade,
        confea_facade_1.ConfeaFacade,
        email_facade_1.EmailFacade,
        email_repository_1.EmailRepository,
        storage_facade_1.StorageFacade,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map