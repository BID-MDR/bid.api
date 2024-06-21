import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateWorkRequestRoomTypeQuantityDto } from '../../dtos/work-request/work-request-room-type-quantity/create-work-request-room-type-quantity.dto';
import { UpdateWorkRequestRoomTypeQuantityDto } from '../../dtos/work-request/work-request-room-type-quantity/update-work-request-room-type-quantity.dto';
import { WorkRequestRoomTypeQuantityEntity } from '../../entitites/work-request-room-type-quantity.entity';

@Injectable()
export class WorkRequestRoomTypeQuantityRepository extends BaseRepository<
    WorkRequestRoomTypeQuantityEntity,
    CreateWorkRequestRoomTypeQuantityDto,
    UpdateWorkRequestRoomTypeQuantityDto
> {
    constructor(
        @InjectRepository(WorkRequestRoomTypeQuantityEntity)
        private repository: Repository<WorkRequestRoomTypeQuantityEntity>,
    ) {
        super(repository);
    }
}
