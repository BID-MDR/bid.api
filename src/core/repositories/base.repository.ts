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
        return this.__repository.find();
    }

    async findById(id: number): Promise<T> {
        return this.__repository.findOne(id as any);
    }

    async count(): Promise<number> {
        return this.__repository.count();
    }

    async create(data: CreateDto): Promise<T> {
        const entity = this.__repository.create(data);
        return this.__repository.save(entity)[0];
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
