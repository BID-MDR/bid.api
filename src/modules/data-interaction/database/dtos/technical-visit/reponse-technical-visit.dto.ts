import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { TechnicalVisitStatusEnum } from "../../enums/technical-visit-status.enum";
import { WorkRequestResponseDto } from "../work-request/response-work-request.dto";

@Exclude()
class UserEntityDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;
}

export class TechnicalVisitResponseDto {
    @ApiProperty()
    from: Date;

    @ApiProperty()
    to: Date;

    @ApiProperty()
    cancelReason: string;

    @ApiProperty({ type: UserEntityDto })
    cancelledBy: UserEntityDto;

    @ApiProperty({ type: UserEntityDto })
    rescheduledBy: UserEntityDto;

    @ApiProperty({ type: UserEntityDto })
    professional: UserEntityDto;

    @ApiProperty({ type: UserEntityDto })
    beneficiary: UserEntityDto;

    @Exclude()
    workRequest: WorkRequestResponseDto;

    @ApiProperty({ enum: TechnicalVisitStatusEnum })
    status: TechnicalVisitStatusEnum;
}
