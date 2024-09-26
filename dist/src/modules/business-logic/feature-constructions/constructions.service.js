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
exports.ConstructionsService = void 0;
const common_1 = require("@nestjs/common");
const room_solution_repository_1 = require("../../data-interaction/database/repositories/room/room-solution.repository");
const user_generated_media_repository_1 = require("../../data-interaction/database/repositories/user/user-generated-media.repository");
const aws_subsystem_1 = require("../../data-interaction/facade/apis/storage/aws.subsystem");
const media_type_enum_1 = require("../../data-interaction/database/enums/media-type.enum");
const constructions_repository_1 = require("../../data-interaction/database/repositories/constructions.repository");
const demand_repository_1 = require("../../data-interaction/database/repositories/user/demand.repository");
const demand_status_enum_1 = require("../../data-interaction/database/enums/demand-status.enum");
const constructions_stauts_enum_1 = require("../../data-interaction/database/enums/constructions-stauts.enum");
let ConstructionsService = class ConstructionsService {
    demandRepository;
    constructionsRepository;
    roomSolutionService;
    userGeneratedMediaRepository;
    S3;
    constructor(demandRepository, constructionsRepository, roomSolutionService, userGeneratedMediaRepository, S3) {
        this.demandRepository = demandRepository;
        this.constructionsRepository = constructionsRepository;
        this.roomSolutionService = roomSolutionService;
        this.userGeneratedMediaRepository = userGeneratedMediaRepository;
        this.S3 = S3;
    }
    async firstStepPhotos(roomSolutionId, files, demandId, companyId) {
        if (!files.length) {
            throw new common_1.BadRequestException("Files are required");
        }
        const demand = await this.demandRepository.findById(demandId);
        if (!demand) {
            throw new common_1.BadRequestException("Demand not found");
        }
        if (demand.company.id !== companyId) {
            throw new common_1.BadRequestException("Not authorized to access this demand");
        }
        const roomSolutions = demand.workRequest.room
            .map(room => room.roomSolutions)
            .filter(a => !!a)
            .flat();
        if (!roomSolutions.some(roomSolution => roomSolution.id === roomSolutionId)) {
            throw new common_1.BadRequestException("Room solution not found");
        }
        const roomSolution = await this.roomSolutionService.findById(roomSolutionId);
        if (!roomSolution) {
            throw new common_1.BadRequestException("Room solution not found");
        }
        for (const file of files) {
            const name = "construction-" + new Date().getTime();
            const url = await this.S3.uploadMediaBuffer(file.mimetype, name, file.buffer);
            const userMidia = await this.userGeneratedMediaRepository.create({
                url,
                mimeType: file.mimetype,
                type: media_type_enum_1.MediaTypeEnum.FOTO,
            });
            roomSolution.picturesAndVideos.push(userMidia);
        }
        await roomSolution.save();
        await demand.reload();
        return demand;
    }
    async secondStepConstructions(dto, demandId, companyId) {
        const demand = await this.demandRepository.findById(demandId);
        if (!demand) {
            throw new common_1.BadRequestException("Demand not found");
        }
        if (demand.company.id !== companyId) {
            throw new common_1.BadRequestException("Not authorized to access this demand");
        }
        const constructions = await this.constructionsRepository.create({
            type: dto.type,
            area: +dto.area,
            description: dto.description,
            status: constructions_stauts_enum_1.ConstructionsStatusEnum.EM_ANDAMENTO,
        });
        demand.construction = constructions;
        demand.status = demand_status_enum_1.DemandStatusEnum.CONCLUIR_OBRAS;
        return await demand.save();
    }
    async update(dto, demandId, companyId) {
        const demand = await this.demandRepository.findById(demandId);
        if (!demand) {
            throw new common_1.BadRequestException("Demand not found");
        }
        if (demand.company.id !== companyId) {
            throw new common_1.BadRequestException("Not authorized to access this demand");
        }
        const constructions = await this.constructionsRepository.findById(demand.construction.id);
        if (!constructions) {
            throw new common_1.BadRequestException("Constructions not found");
        }
        constructions.type = dto.type;
        constructions.area = +dto.area;
        constructions.description = dto.description;
        return await constructions.save();
    }
    async deletePhoto(demandId, photoId) {
        const demand = await this.demandRepository.findById(demandId);
        if (!demand) {
            throw new common_1.BadRequestException("Demand not found");
        }
        const roomSolutions = demand.workRequest.room
            .map(room => room.roomSolutions)
            .filter(a => !!a)
            .flat();
        const roomSolution = roomSolutions.find(roomSolution => roomSolution.picturesAndVideos.some(p => p.id === photoId));
        if (!roomSolution) {
            throw new common_1.BadRequestException("Room solution not found");
        }
        const photo = roomSolution.picturesAndVideos.find(p => p.id === photoId);
        if (!photo) {
            throw new common_1.BadRequestException("Photo not found");
        }
        roomSolution.picturesAndVideos = roomSolution.picturesAndVideos.filter(p => p.id !== photoId);
        await roomSolution.save();
        await this.S3.deleteMedia(photo.url);
        await this.userGeneratedMediaRepository.hardDelete(photoId);
        await demand.reload();
        return demand;
    }
    async list() {
        return await this.constructionsRepository.findAll();
    }
    async listByMonth(month) {
        return await this.constructionsRepository.findMonth(month);
    }
    async getById(constructionsId) {
        return await this.constructionsRepository.findById(constructionsId);
    }
    async validatePhotos(constructionsId) {
        const constructions = await this.getById(constructionsId);
        if (!constructions) {
            throw new common_1.BadRequestException("Constructions not found");
        }
        constructions.status = constructions_stauts_enum_1.ConstructionsStatusEnum.EM_ANDAMENTO;
        return await constructions.save();
    }
    async cancel(constructionsId) {
        const constructions = await this.getById(constructionsId);
        if (!constructions) {
            throw new common_1.BadRequestException("Constructions not found");
        }
        const demand = await this.demandRepository.getByConstructionId(constructionsId);
        demand.status = demand_status_enum_1.DemandStatusEnum.CANCELADO;
        await demand.save();
        constructions.status = constructions_stauts_enum_1.ConstructionsStatusEnum.CANCELADA;
        return await constructions.save();
    }
    async conclude(constructionsId, companyId) {
        const constructions = await this.getById(constructionsId);
        if (!constructions) {
            throw new common_1.BadRequestException("Constructions not found");
        }
        const demand = await this.demandRepository.getByConstructionId(constructionsId);
        if (demand.company.id !== companyId) {
            throw new common_1.BadRequestException("Not authorized to access this demand");
        }
        demand.status = demand_status_enum_1.DemandStatusEnum.ESPERANDO_VALIDACAO;
        await demand.save();
        constructions.status = constructions_stauts_enum_1.ConstructionsStatusEnum.CONCLUIDA;
        return await constructions.save();
    }
};
exports.ConstructionsService = ConstructionsService;
exports.ConstructionsService = ConstructionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [demand_repository_1.DemandRepository,
        constructions_repository_1.ConstructionsRepository,
        room_solution_repository_1.RoomSolutionRepository,
        user_generated_media_repository_1.UserGeneratedMediaRepository,
        aws_subsystem_1.AwsSubsystem])
], ConstructionsService);
//# sourceMappingURL=constructions.service.js.map