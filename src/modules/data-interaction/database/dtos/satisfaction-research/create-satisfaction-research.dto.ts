import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsUUID, Length } from "class-validator";
import { UserEntity } from "../../entitites/user.entity";
import { WorkRequestEntity } from "../../entitites/work-request.entity";

export class CreateSatisfactionResearchDto {
    @ApiProperty({type: Number})
    programGrade: number;

    @ApiProperty({type: Number})
    plataformGrade: number;

    @ApiProperty({type: Number})
    professionalGrade: number;

    @ApiProperty()
    comments?: string;
  
    user?: UserEntity;
    workRequest?: WorkRequestEntity;
}