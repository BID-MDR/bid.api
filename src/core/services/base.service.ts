import { DeepPartial } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BaseRepository } from '../repositories/base.repository';

export abstract class BaseService<
    T extends BaseEntity,
    CreateDto extends DeepPartial<T>,
    UpdatedDto extends DeepPartial<T>,
> {
    private __repository: BaseRepository<T, CreateDto, UpdatedDto>;

    constructor(repository: BaseRepository<T, CreateDto, UpdatedDto>) {
        this.__repository = repository;
    }

    async findAll(): Promise<T[]> {
        return await this.__repository.findAll();
    }

    async findById(id: number): Promise<T> {
        return await this.__repository.findById(id);
    }

    async count(): Promise<number> {
        return await this.__repository.count();
    }

    async create(data: CreateDto): Promise<T> {
        return await this.__repository.create(data);
    }

    async update(id: number, data: UpdatedDto): Promise<T> {
        return await this.__repository.update(id, data);
    }

    async hardDelete(id: number): Promise<void> {
        return await this.__repository.hardDelete(id);
    }
}
