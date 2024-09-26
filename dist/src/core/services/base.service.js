"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    __repository;
    constructor(repository) {
        this.__repository = repository;
    }
    async findAll() {
        return await this.__repository.findAll();
    }
    async findById(id) {
        return await this.__repository.findById(id);
    }
    async count() {
        return await this.__repository.count();
    }
    async create(data) {
        return await this.__repository.create(data);
    }
    async createMany(data) {
        return await this.__repository.createMany(data);
    }
    async update(id, data) {
        return await this.__repository.update(id, data);
    }
    async hardDelete(id) {
        return await this.__repository.hardDelete(id);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map