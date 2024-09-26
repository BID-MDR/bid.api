import { DeepPartial } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BaseRepository } from '../repositories/base.repository';
export declare abstract class BaseService<T extends BaseEntity, CreateDto extends DeepPartial<T>, UpdatedDto extends DeepPartial<T> & {
    id?: string;
}> {
    private __repository;
    constructor(repository: BaseRepository<T, CreateDto, UpdatedDto>);
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    count(): Promise<number>;
    create(data: CreateDto): Promise<T>;
    createMany(data: CreateDto[]): Promise<T[]>;
    update(id: string, data: UpdatedDto): Promise<T>;
    hardDelete(id: string): Promise<void>;
}
