import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";
import { RoomEntity } from "../../entitites/room.entity";
import { InterventionStatusEnum } from "../../enums/intervention-status.enum";


export class CreateInterventionRequestDto {
    @ApiProperty()
    roomId?: string;


    room?: RoomEntity;

    
    @ApiProperty()
    @IsString()
    value: string;

    @ApiProperty()
    @IsString()
    toDo: string;

    @ApiProperty()
    interventionSituation?: InterventionStatusEnum;

    @ApiProperty()
    interventiondescription?: string;
}
