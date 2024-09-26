"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    __repository;
    constructor(repository) {
        this.__repository = repository;
    }
    async findAll() {
        return await this.__repository.find({
            loadEagerRelations: true,
        });
    }
    async findById(id) {
        return await this.__repository.findOne({
            where: {
                id: id,
            },
            loadEagerRelations: true,
        });
    }
    async count() {
        return await this.__repository.count();
    }
    async create(data) {
        const entity = this.__repository.create(data);
        return await this.__repository.save(entity);
    }
    async createMany(data) {
        const entities = this.__repository.create(data);
        return await this.__repository.save(entities);
    }
    async update(id, data) {
        delete data.id;
        await this.__repository.update(id, data);
        return this.findById(id);
    }
    async hardDelete(id) {
        await this.__repository.delete(id);
    }
    async softDelete(id) {
        await this.__repository.softDelete(id);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map