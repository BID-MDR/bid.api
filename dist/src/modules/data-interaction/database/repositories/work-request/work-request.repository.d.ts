import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { Repository } from "typeorm";
import { CreateWorkRequestDto } from "../../dtos/work-request/create-work-request.dto";
import { UpdateWorkRequestDto } from "../../dtos/work-request/update-work-request.dto";
export declare class WorkRequestRepository extends BaseRepository<WorkRequestEntity, CreateWorkRequestDto, UpdateWorkRequestDto> {
    private repository;
    constructor(repository: Repository<WorkRequestEntity>);
}
