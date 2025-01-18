import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";
import { RoomEntity } from "../../entitites/room.entity";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { UserEntity } from "../../entitites/user.entity";


export class CreateContractRequestDto {


    @ApiProperty()
    workRequestId?: string;

    workRequest: WorkRequestEntity
    
    @ApiProperty()
    @IsString()
    total: string;

    @ApiProperty()
    @IsString()
    resume: string

    @ApiProperty()
    startDate: Date

    @ApiProperty()
    endDate: Date

    @ApiProperty()
    adjustRequested?: string

    @ApiProperty()
    cancelationReason?:string

    @ApiProperty()
    professionalId?: string;

    professional: UserEntity

}
