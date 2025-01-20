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
import { RoomAddPhotoDto } from 'src/modules/data-interaction/database/dtos/room/room-add-photo.dto';
import { StorageFacade } from 'src/modules/data-interaction/facade/apis/storage/storage.facade';
import { MediaTypeEnum } from 'src/modules/data-interaction/database/enums/media-type.enum';
import { AwsSubsystem } from 'src/modules/data-interaction/facade/apis/storage/aws.subsystem';
import { UserGeneratedMediaRepository } from 'src/modules/data-interaction/database/repositories/user/user-generated-media.repository';

@Injectable()
export class FeatureRoomService extends BaseService<
    RoomEntity,
    CreateRoomDto,
    UpdateRoomDto
> {
    constructor(
        private roomRepository: RoomRepository,
        private roomSolutionRepository: RoomSolutionRepository,
        private workRequestRepository: WorkRequestRepository,
        private readonly S3: AwsSubsystem,
        private readonly userGeneratedMediaRepository: UserGeneratedMediaRepository,
            
        

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

    async addStartPhoto(id: string, files: Array<Express.Multer.File>): Promise<RoomEntity> {
         if (!files.length) {
             throw new BadRequestException("Files are required");
           }
       
           const room = await this.roomRepository.findById(id);
       
           if (!room) {
             throw new BadRequestException("Room not found");
           }
       
           for (const file of files) {
             const name = "construction-" + new Date().getTime();
             const url = await this.S3.uploadMediaBuffer(file.mimetype, name, file.buffer);
             const userMidia = await this.userGeneratedMediaRepository.create({
               url,
               mimeType: file.mimetype,
               type: MediaTypeEnum.FOTO,
             });
             room.startWorkPhotos.push(userMidia);
           }
           await room.save();
       
           await room.reload();
       
           return room;
    }

    async addEndPhoto(id: string, files: Array<Express.Multer.File>): Promise<RoomEntity> {
        if (!files.length) {
            throw new BadRequestException("Files are required");
          }
      
          const room = await this.roomRepository.findById(id);
      
          if (!room) {
            throw new BadRequestException("Room not found");
          }
      
          for (const file of files) {
            const name = "construction-" + new Date().getTime();
            const url = await this.S3.uploadMediaBuffer(file.mimetype, name, file.buffer);
            const userMidia = await this.userGeneratedMediaRepository.create({
              url,
              mimeType: file.mimetype,
              type: MediaTypeEnum.FOTO,
            });
            room.endWorkPhotos.push(userMidia);
          }
          await room.save();
      
          await room.reload();
      
          return room;
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

    async getRoomById(id: string){
        const room = await this.roomRepository.findById(id);
        if(!room)  throw new BadRequestException('Room não encontrado');
        return room

    }

    async selectAllByWorkRequest(id:string){
        return await this.roomRepository.findByWorkRequest(id);
    }

    async selectInterventions(id:string){

        return await this.roomRepository.findRoomAndSolutions(id);
    }


    async register(body: RequestRoomSolutionDto){
        if(body.room && Object.keys(body.room).length === 0) {
            delete body.room
        }
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
