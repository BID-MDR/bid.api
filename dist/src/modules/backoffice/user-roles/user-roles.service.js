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
exports.UserRoleService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const base_service_1 = require("../../../core/services/base.service");
const user_repository_1 = require("../../data-interaction/database/repositories/backoffice/user/user.repository");
const email_facade_1 = require("../../data-interaction/facade/apis/email/email.facade");
const caub_facade_1 = require("../../data-interaction/facade/apis/gov/caubr/caub.facade");
const confea_facade_1 = require("../../data-interaction/facade/apis/gov/confea/confea.facade");
const storage_facade_1 = require("../../data-interaction/facade/apis/storage/storage.facade");
const user_roles_repository_1 = require("../../data-interaction/database/repositories/backoffice/user/user-roles.repository");
let UserRoleService = class UserRoleService extends base_service_1.BaseService {
    userRolesBackofficeRepository;
    userBackofficeRepository;
    caubFacade;
    confeaFacade;
    emailFacade;
    storageFacade;
    configService;
    constructor(userRolesBackofficeRepository, userBackofficeRepository, caubFacade, confeaFacade, emailFacade, storageFacade, configService) {
        super(userRolesBackofficeRepository);
        this.userRolesBackofficeRepository = userRolesBackofficeRepository;
        this.userBackofficeRepository = userBackofficeRepository;
        this.caubFacade = caubFacade;
        this.confeaFacade = confeaFacade;
        this.emailFacade = emailFacade;
        this.storageFacade = storageFacade;
        this.configService = configService;
    }
    async create(data) {
        return await super.create(data);
    }
    async activeRole(roleId) {
        const userRole = await this.userRolesBackofficeRepository.findById(roleId);
        if (!userRole)
            throw new common_1.BadRequestException("Função não encontrada.");
        return await this.userRolesBackofficeRepository.update(roleId, { active: 1 });
    }
    async findByName(name) {
        return await this.userRolesBackofficeRepository.findByName(name);
    }
    async list() {
        return await this.userRolesBackofficeRepository.findAll();
    }
    async hardDelete(id) {
        return await this.userRolesBackofficeRepository.hardDelete(id);
    }
};
exports.UserRoleService = UserRoleService;
exports.UserRoleService = UserRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_roles_repository_1.UserRolesBackofficeRepository,
        user_repository_1.UserBackofficeRepository,
        caub_facade_1.CaubFacade,
        confea_facade_1.ConfeaFacade,
        email_facade_1.EmailFacade,
        storage_facade_1.StorageFacade,
        config_1.ConfigService])
], UserRoleService);
//# sourceMappingURL=user-roles.service.js.map