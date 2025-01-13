import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ConstructionsTypeEnum } from "../../enums/constructions-type.status";
import { UserProgramTypeEnum } from "../../enums/user-program-type.enum";

export class CreateConstructionsDto {
  @ApiProperty()
  @IsEnum(ConstructionsTypeEnum)
  @IsNotEmpty()
  type: ConstructionsTypeEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  area: number;

  @ApiProperty()
  @IsEnum(UserProgramTypeEnum)
  @IsNotEmpty()
  programType: UserProgramTypeEnum;
}
