import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ConstructionsTypeEnum } from "../../enums/constructions-type.status";

class ConstructionsDto {
  @ApiProperty()
  // @IsUUID()
  // @IsNotEmpty()
  roomSolutionId: string;
}

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

  @ApiProperty({ type: ConstructionsDto, isArray: true })
  constructions: ConstructionsDto[];
}
