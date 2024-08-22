import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsUUID, Length } from "class-validator";
import { UserEntity } from "../../entitites/user.entity";

export class CreateNotificationDto {
    @ApiProperty()
    description: string;

    @ApiProperty()
    @IsUUID()
    userId: string;
    user: UserEntity;
}