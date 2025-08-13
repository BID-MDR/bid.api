import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";
import { RoomEntity } from "../../entitites/room.entity";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { UserEntity } from "../../entitites/user.entity";


export class CreateCostEstimateRequestDto {
    @ApiProperty()
    roomId?: string[];

    rooms?: RoomEntity[];

    @ApiProperty()
    workRequestId?: string;

    workRequest: WorkRequestEntity
    
    @ApiProperty()
    @IsString()
    total: string;

    @ApiProperty()
    estimateDate: string

    @ApiProperty()
    professionalId?: string;

    professional: UserEntity

}
