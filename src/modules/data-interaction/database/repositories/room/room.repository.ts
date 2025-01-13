import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/core/repositories/base.repository";
import { Repository } from "typeorm";
import { CreateRoomDto } from "../../dtos/room/create-room.dto";
import { UpdateRoomDto } from "../../dtos/room/update-room.dto";
import { RoomEntity } from "../../entitites/room.entity";
import { RoomAddPhotoDto } from "../../dtos/room/room-add-photo.dto";

@Injectable()
export class RoomRepository extends BaseRepository<RoomEntity, CreateRoomDto, UpdateRoomDto> {
  constructor(@InjectRepository(RoomEntity) private repository: Repository<RoomEntity>) {
    super(repository);
  }

  async findByWorkRequest(workRequestId: string): Promise<any[]> {
    return this.repository
      .createQueryBuilder("room")
      .where("workRequestId = :workRequestId", { workRequestId })
      .execute();
  }

  async findRoomAndSolutions(workRequestId: string): Promise<any[]> {
    return await this.repository
      .createQueryBuilder("room")
      .leftJoinAndSelect("room.roomSolutions", "roomSolution")
      .leftJoin("room.workRequest", "workRequest")
      .where("workRequest.id = :workRequestId", { workRequestId })
      .getMany();
  }

  async getRoomByRoomSolutionId(roomSolutionId: string): Promise<RoomEntity> {
    return await this.repository
      .createQueryBuilder("room")
      .leftJoinAndSelect("room.roomSolutions", "roomSolution")
      .where("roomSolution.id = :roomSolutionId", { roomSolutionId })
      .getOne();
  }


}
