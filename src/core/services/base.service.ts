import { DeepPartial } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BaseRepository } from '../repositories/base.repository';

export abstract class BaseService<
    T extends BaseEntity,
    CreateDto extends DeepPartial<T>,
    UpdatedDto extends DeepPartial<T>,
> {
    constructor(private readonly repository: BaseRepository<T, CreateDto, UpdatedDto>) {}

    async findAll(): Promise<T[]> {
        return this.repository.findAll();
    }

    async findById(id: number): Promise<T> {
        return this.repository.findById(id);
    }

    async count(): Promise<number> {
        return this.repository.count();
    }

    async create(data: CreateDto): Promise<T> {
        return this.repository.create(data);
    }

    async update(id: number, data: UpdatedDto): Promise<T> {
        return this.repository.update(id, data);
    }

    async hardDelete(id: number): Promise<void> {
        return this.repository.hardDelete(id);
    }
}
