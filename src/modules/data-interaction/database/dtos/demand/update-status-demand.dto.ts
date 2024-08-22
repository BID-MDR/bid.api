import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { DemandStatusEnum } from "../../enums/demand-status.enum";

export class StatusDemandDto {
  @ApiProperty({ enum: DemandStatusEnum })
  @IsEnum(DemandStatusEnum)
  status: DemandStatusEnum;
}
