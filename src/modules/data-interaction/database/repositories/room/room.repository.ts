import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '../../dtos/room/create-room.dto';
import { UpdateRoomDto } from '../../dtos/room/update-room.dto';
import { RoomEntity } from '../../entitites/room.entity';

@Injectable()
export class RoomRepository extends BaseRepository<RoomEntity, CreateRoomDto, UpdateRoomDto> {
    constructor(@InjectRepository(RoomEntity) private repository: Repository<RoomEntity>) {
        super(repository);
    }

    async findByWorkRequest(workRequestId:string): Promise<any[]> {
       return  this.repository.createQueryBuilder("room").where("workRequestId = :workRequestId", {workRequestId}).execute()
    }
}
