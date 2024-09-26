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
exports.FeatureRoomService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const room_repository_1 = require("../../data-interaction/database/repositories/room/room.repository");
const room_solution_repository_1 = require("../../data-interaction/database/repositories/room/room-solution.repository");
const create_room_solution_dto_1 = require("../../data-interaction/database/dtos/room-solution/create-room-solution.dto");
const work_request_repository_1 = require("../../data-interaction/database/repositories/work-request/work-request.repository");
let FeatureRoomService = class FeatureRoomService extends base_service_1.BaseService {
    roomRepository;
    roomSolutionRepository;
    workRequestRepository;
    constructor(roomRepository, roomSolutionRepository, workRequestRepository) {
        super(roomRepository);
        this.roomRepository = roomRepository;
        this.roomSolutionRepository = roomSolutionRepository;
        this.workRequestRepository = workRequestRepository;
    }
    async findById(id) {
        return await this.roomRepository.findById(id);
    }
    async create(room) {
        return await super.create(room);
    }
    async update(id, room) {
        return await super.update(id, room);
    }
    async createRoomSolution(data) {
        const room = await this.roomRepository.findById(data.roomId);
        if (room) {
            data.room = room;
            return await this.roomSolutionRepository.create(data);
        }
        else {
            throw new common_1.BadRequestException('Room não encontrado');
        }
    }
    async selectAll() {
        return await this.roomSolutionRepository.findAllRoomWithoutSolution();
    }
    async selectAllWithIntervention(id) {
        return await this.roomSolutionRepository.findAllRoomWithSolution(id);
    }
    async selectAllByWorkRequest(id) {
        return await this.roomRepository.findByWorkRequest(id);
    }
    async selectInterventions(id) {
        return await this.roomRepository.findRoomAndSolutions(id);
    }
    async register(body) {
        if (body.workRequestId) {
            body.workRequest = await this.workRequestRepository.findById(body.workRequestId);
        }
        if (body.roomId) {
            const RoomEntity = await this.roomRepository.findById(body.roomId);
            body.solution.forEach(async (element) => {
                let room = new create_room_solution_dto_1.CreateRoomSolutionDto({ room: RoomEntity, solution: element });
                return await this.roomSolutionRepository.create(room);
            });
        }
        if (body.room) {
            const result = await super.create({ ...body.room, workRequest: body.workRequest });
            if (result.id) {
                body.solution.forEach(async (element) => {
                    let room = new create_room_solution_dto_1.CreateRoomSolutionDto({ room: result, solution: element });
                    return await this.roomSolutionRepository.create(room);
                });
            }
        }
    }
    async getRoomByRoomSolutionId(roomSolutionId) {
        return await this.roomRepository.getRoomByRoomSolutionId(roomSolutionId);
    }
};
exports.FeatureRoomService = FeatureRoomService;
exports.FeatureRoomService = FeatureRoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [room_repository_1.RoomRepository,
        room_solution_repository_1.RoomSolutionRepository,
        work_request_repository_1.WorkRequestRepository])
], FeatureRoomService);
//# sourceMappingURL=feature-room.service.js.map