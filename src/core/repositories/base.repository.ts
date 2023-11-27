import { DeepPartial, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseRepository<
    T extends BaseEntity,
    CreateDto extends DeepPartial<T>,
    UpdateDto extends DeepPartial<T>,
> {
    constructor(private readonly repository: Repository<T>) {}

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<T> {
        return this.repository.findOne(id as any);
    }

    async count(): Promise<number> {
        return this.repository.count();
    }

    async create(data: CreateDto): Promise<T> {
        const entity = this.repository.create(data);
        return this.repository.save(entity)[0];
    }

    async update(id: number, data: UpdateDto): Promise<T> {
        await this.repository.update(id, data as any);
        return this.findById(id);
    }

    async hardDelete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async softDelete(id: number): Promise<void> {
        await this.repository.softDelete(id);
    }
}
