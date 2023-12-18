import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateWorkRequestPrecarityDto } from '../../dtos/work-request/work-request-precarity/create-work-request-precarity.dto';
import { UpdateWorkRequestPrecarityDto } from '../../dtos/work-request/work-request-precarity/update-work-request-precarity.dto';
import { WorkRequestPrecarityEntity } from '../../entitites/work-request-precarity.entity';

@Injectable()
export class WorkRequestPrecarityRepository extends BaseRepository<
    WorkRequestPrecarityEntity,
    CreateWorkRequestPrecarityDto,
    UpdateWorkRequestPrecarityDto
> {
    constructor(
        @InjectRepository(WorkRequestPrecarityEntity) private repository: Repository<WorkRequestPrecarityEntity>,
    ) {
        super(repository);
    }
}
