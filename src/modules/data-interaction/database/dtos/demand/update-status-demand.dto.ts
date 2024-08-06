import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { BaseResponseDto } from "src/core/dtos/crud/base-response.dto";
import { DemandStatusEnum } from "../../enums/demand-status.enum";
import { DemandEntity } from "../../entitites/demand.entity";

export class StatusDemandDto extends BaseResponseDto {

    @ApiProperty({ enum: DemandStatusEnum })
    @IsEnum(DemandStatusEnum)
    status:string

    constructor(partial: Partial<DemandEntity>) {
        super();
        Object.assign(this, partial);
    }
}