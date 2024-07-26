import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { WorkRequestWelfareEntity } from "../../entitites/work-request-welfare.entity";
import { CreateWorkRequestWelfareDto } from "../../dtos/work-request/create-work-request-welfate.dto";
import { UpdateWorkRequestWelfareDto } from "../../dtos/work-request/update-work-request-welfate.dto";

@Injectable()
export class WorkRequestWelfateRepository extends BaseRepository<
    WorkRequestWelfareEntity,
    CreateWorkRequestWelfareDto,
    UpdateWorkRequestWelfareDto
> {
    constructor(
        @InjectRepository(WorkRequestWelfareEntity)
        private repository: Repository<WorkRequestWelfareEntity>,
    ) {
        super(repository);
    }
}
