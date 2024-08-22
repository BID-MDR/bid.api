import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateRoomDto } from 'src/modules/data-interaction/database/dtos/room/create-room.dto';
import { UpdateRoomDto } from 'src/modules/data-interaction/database/dtos/room/update-room.dto';
import { RoomEntity } from 'src/modules/data-interaction/database/entitites/room.entity';
import { RoomRepository } from 'src/modules/data-interaction/database/repositories/room/room.repository';
import { RoomSolutionRepository } from 'src/modules/data-interaction/database/repositories/room/room-solution.repository';
import { CreateRoomSolutionDto } from 'src/modules/data-interaction/database/dtos/room-solution/create-room-solution.dto';
import { RoomSolutionEntity } from 'src/modules/data-interaction/database/entitites/room-solution.entity';
import { RequestRoomSolutionDto } from 'src/modules/data-interaction/database/dtos/room-solution/request.dto';
import { WorkRequestRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request.repository';

@Injectable()
export class FeatureRoomService extends BaseService<
    RoomEntity,
    CreateRoomDto,
    UpdateRoomDto
> {
    constructor(
        private roomRepository: RoomRepository,
        private roomSolutionRepository: RoomSolutionRepository,
        private workRequestRepository: WorkRequestRepository

    ) {
        super(roomRepository);
    }

    // async listByUserId(userId: string) {
    //     // Implement logic to fetch cost estimations by user ID
    //     return await this.RoomRepository.findByUserId(userId);
    // }
    
    async findById(id: string) {
        // Implement logic to find cost estimation by ID
        return await this.roomRepository.findById(id);
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


    async createRoomSolution(data: CreateRoomSolutionDto): Promise<RoomSolutionEntity> {
        const room = await this.roomRepository.findById(data.roomId);
        if(room){
            data.room = room;
            return await this.roomSolutionRepository.create(data);
        }else{
            throw new BadRequestException('Room não encontrado');
        }
    }


    async selectAll(){
        return await this.roomSolutionRepository.findAllRoomWithoutSolution();
    }

    async selectAllWithIntervention(id: string){
        return await this.roomSolutionRepository.findAllRoomWithSolution(id);
    }

    async selectAllByWorkRequest(id:string){
        return await this.roomRepository.findByWorkRequest(id);
    }

    async selectInterventions(id:string){

        return await this.roomRepository.findRoomAndSolutions(id);
    }


    async register(body: RequestRoomSolutionDto){
        
        if(body.workRequestId){
            body.workRequest = await this.workRequestRepository.findById(body.workRequestId);
        }

        if(body.roomId){
           
            const RoomEntity =  await this.roomRepository.findById(body.roomId)

            body.solution.forEach( async(element) => {
                let room =  new CreateRoomSolutionDto({ room: RoomEntity, solution: element});
                return await this.roomSolutionRepository.create(room);
                
            });
        }

        if(body.room){
            const result = await super.create({...body.room, workRequest: body.workRequest});
            if(result.id){
                body.solution.forEach( async(element) => {
                    let room =  new CreateRoomSolutionDto({ room: result, solution: element});
                    return await this.roomSolutionRepository.create(room);
                    
                });
            }
        }
    }

   async getRoomByRoomSolutionId(roomSolutionId: string) {
       return await this.roomRepository.getRoomByRoomSolutionId(roomSolutionId)
    }
}
