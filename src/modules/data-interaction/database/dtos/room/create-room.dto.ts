import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, Length } from "class-validator";
import { RoomTypeEnum } from "../../enums/room-type.enum";
import { WorkRequestEntity } from "../../entitites/work-request.entity";

export class CreateRoomDto {
    @ApiProperty()
    @Length(3, 70)
    name: string;

    @ApiProperty({ enum: RoomTypeEnum })
    @IsEnum(RoomTypeEnum)
    type: RoomTypeEnum;


    workRequest?: WorkRequestEntity

}