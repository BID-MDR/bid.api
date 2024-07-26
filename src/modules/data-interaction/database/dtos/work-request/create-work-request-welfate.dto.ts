import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { WelfareProgramEnum } from "../../enums/welfare-program.enum";

export class CreateWorkRequestWelfareDto {
  @ApiProperty()
  @IsEnum(WelfareProgramEnum)
  @IsNotEmpty()
  welfareProgram: WelfareProgramEnum;
}