import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '../../dtos/room/create-Room.dto';
import { UpdateRoomDto } from '../../dtos/room/update-Room.dto';
import { RoomEntity } from '../../entitites/Room.entity';

@Injectable()
export class RoomRepository extends BaseRepository<RoomEntity, CreateRoomDto, UpdateRoomDto> {
    constructor(@InjectRepository(RoomEntity) private repository: Repository<RoomEntity>) {
        super(repository);
    }
}
