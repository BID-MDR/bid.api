import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateRoomDto } from 'src/modules/data-interaction/database/dtos/room/create-room.dto';
import { UpdateRoomDto } from 'src/modules/data-interaction/database/dtos/room/update-room.dto';
import { RoomEntity } from 'src/modules/data-interaction/database/entitites/room.entity';
import { RoomRepository } from 'src/modules/data-interaction/database/repositories/room/room.repository';

@Injectable()
export class FeatureRoomService extends BaseService<
    RoomEntity,
    CreateRoomDto,
    UpdateRoomDto
> {
    constructor(
        private RoomRepository: RoomRepository,
    ) {
        super(RoomRepository);
    }

    async listByUserId(userId: string) {
        // Implement logic to fetch cost estimations by user ID
        return await this.RoomRepository.findByUserId(userId);
    }
    async findById(id: string) {
        // Implement logic to find cost estimation by ID
        return await this.RoomRepository.findById(id);
    }

    async create(room: CreateRoomDto): Promise<RoomEntity> {
        // Implement logic to create a new cost estimation
        return await super.create(room);
    }

    async update(id: string, room: UpdateRoomDto): Promise<RoomEntity> {
        // Implement logic to update an existing cost estimation
        // Here, you might want to add some checks to ensure that the user is authorized to update the cost estimation
        return await super.update(id, room);
    }
}
