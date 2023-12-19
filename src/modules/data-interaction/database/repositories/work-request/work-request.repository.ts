import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateWorkRequestDto } from '../../dtos/work-request/create-work-request.dto';
import { UpdateWorkRequestDto } from '../../dtos/work-request/update-work-request.dto';
import { WorkRequestEntity } from '../../entitites/work-request.entity';

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
            FROM work_request
            WHERE userId = '${userId}'
        `);
    }
}
