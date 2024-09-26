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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const base_repository_1 = require("../../../../../core/repositories/base.repository");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("../../entitites/message.entity");
let MessageRepository = class MessageRepository extends base_repository_1.BaseRepository {
    repository;
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async getById(_id) {
        return this.repository.findOne({ where: { id: _id } });
    }
    async listConversationByIdentifier(identifier) {
        const messages = await this.repository.find({
            where: { identifier },
            order: { sentAt: 'DESC' }
        });
        return messages;
    }
    async listByConversation(user1, user2) {
        return await this.repository.createQueryBuilder('message')
            .innerJoinAndSelect('message.sender', 'sender')
            .innerJoinAndSelect('message.receiver', 'receiver')
            .where('(sender.id = :user1Id AND receiver.id = :user2Id) OR (sender.id = :user2Id AND receiver.id = :user1Id)', { user1Id: user1.id, user2Id: user2.id })
            .orderBy('message.sentAt', 'ASC')
            .getMany();
    }
    async listAllMsgByUser(user) {
        return await this.repository.createQueryBuilder('message')
            .innerJoinAndSelect('message.sender', 'sender')
            .innerJoinAndSelect('message.receiver', 'receiver')
            .where('sender.id = :userId OR receiver.id = :userId', { userId: user.id })
            .orderBy('message.sentAt', 'DESC')
            .getMany();
    }
    async list() {
        return this.repository.find();
    }
};
exports.MessageRepository = MessageRepository;
exports.MessageRepository = MessageRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.MessageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessageRepository);
//# sourceMappingURL=message.repository.js.map