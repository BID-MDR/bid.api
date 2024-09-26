import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { WorkRequestWelfareEntity } from "../../entitites/work-request-welfare.entity";
import { CreateWorkRequestWelfareDto } from "../../dtos/work-request/create-work-request-welfate.dto";
import { UpdateWorkRequestWelfareDto } from "../../dtos/work-request/update-work-request-welfate.dto";
export declare class WorkRequestWelfateRepository extends BaseRepository<WorkRequestWelfareEntity, CreateWorkRequestWelfareDto, UpdateWorkRequestWelfareDto> {
    private repository;
    constructor(repository: Repository<WorkRequestWelfareEntity>);
}
