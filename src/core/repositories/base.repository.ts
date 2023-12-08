import { DeepPartial, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseRepository<
    T extends BaseEntity,
    CreateDto extends DeepPartial<T>,
    UpdateDto extends DeepPartial<T>,
> {
    private __repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.__repository = repository;
    }

    async findAll(): Promise<T[]> {
        return await this.__repository.find({
            loadEagerRelations: true,
        });
    }

    async findById(id: number): Promise<T> {
        return await this.__repository.findOne({
            where: {
                id: id as any,
            },
            loadEagerRelations: true,
        });
    }

    async count(): Promise<number> {
        return await this.__repository.count();
    }

    async create(data: CreateDto): Promise<T> {
        const entity = this.__repository.create(data);
        const registeredData = await this.__repository.save(entity);
        return await this.findById(registeredData.id);
    }

    async update(id: number, data: UpdateDto): Promise<T> {
        await this.__repository.update(id, data as any);
        return this.findById(id);
    }

    async hardDelete(id: number): Promise<void> {
        await this.__repository.delete(id);
    }

    async softDelete(id: number): Promise<void> {
        await this.__repository.softDelete(id);
    }
}
