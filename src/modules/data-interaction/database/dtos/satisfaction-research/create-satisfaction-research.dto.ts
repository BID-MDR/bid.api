import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsUUID, Length } from "class-validator";
import { UserEntity } from "../../entitites/user.entity";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { UserProgramTypeEnum } from "../../enums/user-program-type.enum";

export class CreateSatisfactionResearchDto {
    @ApiProperty({type: Number})
    programGrade: number;

    @ApiProperty({type: Number})
    plataformGrade: number;

    @ApiProperty({type: Number})
    professionalGrade: number;

    @ApiProperty()
    comments?: string;

    @ApiProperty({ enum: UserProgramTypeEnum })
    @IsEnum(UserProgramTypeEnum)
    programType: UserProgramTypeEnum;
  
    user?: UserEntity;
    workRequest?: WorkRequestEntity;
}