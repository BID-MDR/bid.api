import { DeepPartial, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
export declare abstract class BaseRepository<T extends BaseEntity, CreateDto extends DeepPartial<T>, UpdateDto extends DeepPartial<T> & {
    id?: string;
}> {
    private __repository;
    constructor(repository: Repository<T>);
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    count(): Promise<number>;
    create(data: CreateDto): Promise<T>;
    createMany(data: CreateDto[]): Promise<T[]>;
    update(id: string, data: UpdateDto): Promise<T>;
    hardDelete(id: string): Promise<void>;
    softDelete(id: string): Promise<void>;
}
