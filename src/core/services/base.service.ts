import { DataSource, DeleteResult, EntityTarget, QueryRunner, UpdateResult } from 'typeorm';
import { BaseModel } from '../models/base.model';

export abstract class BaseService<EntityModel extends BaseModel, RegisterDto, UpdateDto> {
    protected queryRunner: QueryRunner;
    private __model: EntityTarget<EntityModel>;

    constructor(private readonly __dataSource: DataSource, __model: EntityTarget<any>) {
        this.queryRunner = this.__dataSource.createQueryRunner();
        this.__model = __model;
    }

    async list() {
        return await this.prepareAndSendTransaction<EntityModel[]>(() => this.queryRunner.manager.find(this.__model));
    }

    async listByIds(ids: number[]) {
        return await this.prepareAndSendTransaction<EntityModel[]>(() => this.queryRunner.manager.find(this.__model));
    }

    async getById(id: number) {
        return await this.prepareAndSendTransaction<EntityModel>(() => this.queryRunner.manager.findOne(this.__model));
    }

    async count() {
        return await this.prepareAndSendTransaction<number>(() => this.queryRunner.manager.count(this.__model));
    }

    async create(dto: RegisterDto) {
        return await this._dataSource.create(dto);
    }

    async update(_id: string, dto: UpdateDto): Promise<Model> {
        return await this._dataSource.update(_id, dto);
    }

    async hardDelete(_id: string) {
        await this._dataSource.hardDelete(_id);
    }

    protected async prepareAndSendTransaction<
        Result extends EntityModel | EntityModel[] | UpdateResult | DeleteResult | number | null,
    >(query: () => Promise<EntityModel | EntityModel[] | UpdateResult | DeleteResult | number | null>) {
        try {
            await this.queryRunner.connect();
            await this.queryRunner.startTransaction();
            const result = await query();
            await this.queryRunner.commitTransaction();
            return result as Result;
        } catch (error) {
            await this.queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await this.queryRunner.release();
        }
    }
}
