import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateWorkRequestRoomToWorkDto } from '../../dtos/work-request/work-request-room-to-work/create-work-request-room-to-work.dto';
import { UpdateWorkRequestRoomToWorkDto } from '../../dtos/work-request/work-request-room-to-work/update-work-request-room-to-work.dto';
import { WorkRequestRoomToWorkEntity } from '../../entitites/work-request-room-to-work.entity';

@Injectable()
export class WorkRequestRoomToWorkRepository extends BaseRepository<
    WorkRequestRoomToWorkEntity,
    CreateWorkRequestRoomToWorkDto,
    UpdateWorkRequestRoomToWorkDto
> {
    constructor(
        @InjectRepository(WorkRequestRoomToWorkEntity) private repository: Repository<WorkRequestRoomToWorkEntity>,
    ) {
        super(repository);
    }
}
