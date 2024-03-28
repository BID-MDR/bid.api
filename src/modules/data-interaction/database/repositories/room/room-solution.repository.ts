import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateRoomSolutionDto } from '../../dtos/room-solution/create-room-solution.dto';
import { RoomSolutionEntity } from '../../entitites/room-solution.entity';

export class RoomSolutionRepository extends BaseRepository<RoomSolutionEntity, CreateRoomSolutionDto, any> {
    constructor(@InjectRepository(RoomSolutionEntity) private repository: Repository<RoomSolutionEntity>) {
        super(repository);
    }
}
