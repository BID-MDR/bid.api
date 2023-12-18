import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateWorkRequestWelfareProgramDto } from '../../dtos/work-request/work-request-welfare-program/create-work-request-welfare-program.dto';
import { UpdateWorkRequestWelfareProgramDto } from '../../dtos/work-request/work-request-welfare-program/update-work-request-welfare-program.dto';
import { WorkRequestWelfareProgramEntity } from '../../entitites/work-request-welfare-program.entity';

@Injectable()
export class WorkRequestWelfareProgramRepository extends BaseRepository<
    WorkRequestWelfareProgramEntity,
    CreateWorkRequestWelfareProgramDto,
    UpdateWorkRequestWelfareProgramDto
> {
    constructor(
        @InjectRepository(WorkRequestWelfareProgramEntity)
        private repository: Repository<WorkRequestWelfareProgramEntity>,
    ) {
        super(repository);
    }
}
