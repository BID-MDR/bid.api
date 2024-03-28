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
    async findByUserId(userId: string): Promise<RoomEntity[]> {
        return await this.repository.createQueryBuilder('room-solution')
            .leftJoin('room-solution.roomId', 'room')
            .leftJoin('room-solution.constructionId', 'construction')
            .leftJoin('room-solution.costEstimationId', 'cost-estimation')
            .leftJoin('contract.workRequestId', 'work-request')
            .leftJoin('work-request.beneficiaryId', 'user')
            .leftJoin('user.addressId', 'address')
            .where('work-request.beneficiaryId = :id', { userId })
            .getMany();
    }

    async findById(id: string): Promise<RoomEntity | undefined> {

        return await this.repository.createQueryBuilder('room-solution')
            .leftJoin('room-solution.roomId', 'room')
            .leftJoin('room-solution.constructionId', 'construction')
            .leftJoin('room-solution.costEstimationId', 'cost-estimation')
            .leftJoin('contract.workRequestId', 'work-request')
            .leftJoin('work-request.beneficiaryId', 'user')
            .leftJoin('user.addressId', 'address')
            .where('construction.id = :id', { id })
            .getOne();
    }
}
