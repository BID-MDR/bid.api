import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";
import { RoomEntity } from "../../entitites/room.entity";
import { WorkRequestEntity } from "../../entitites/work-request.entity";


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
    estimateDate: Date

}
