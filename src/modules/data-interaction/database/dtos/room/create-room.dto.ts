import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, Length } from "class-validator";
import { RoomTypeEnum } from "../../enums/room-type.enum";

export class CreateRoomDto {
    @ApiProperty()
    @Length(3, 70)
    name: string;

    @ApiProperty({ enum: RoomTypeEnum })
    @IsEnum(RoomTypeEnum)
    type: RoomTypeEnum;
}