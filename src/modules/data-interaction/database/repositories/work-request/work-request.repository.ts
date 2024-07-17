import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateWorkRequestDto } from '../../dtos/work-request/create-work-request.dto';
import { UpdateWorkRequestDto } from '../../dtos/work-request/update-work-request.dto';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { WorkRequestTypeEnum } from '../../enums/work-request-type.enum';

@Injectable()
export class WorkRequestRepository extends BaseRepository<
    WorkRequestEntity,
    CreateWorkRequestDto,
    UpdateWorkRequestDto
> {
    constructor(@InjectRepository(WorkRequestEntity) private repository: Repository<WorkRequestEntity>) {
        super(repository);
    }

    async findByUserId(userId: string) {
        return await this.repository.query(`
            SELECT *
            FROM work-request
            WHERE userId = '${userId}'
        `);
    }


    async findAll(){
        return await this.repository.query("SELECT * FROM `work-request` WHERE status = 'NAO_ATRIBUIDO'")
    }


    async updateStatus(work_id, professional_id){
        return await this.repository.createQueryBuilder("work-request")
        .update("work-request")
        .set({status: WorkRequestTypeEnum.ATRIBUIDO, professional: professional_id})
        .where("id = :id", {id:work_id})
        .execute()
    }
}
