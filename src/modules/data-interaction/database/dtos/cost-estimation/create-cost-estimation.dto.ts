import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID, Length, ValidateNested } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { CreateRoomSolutionDto } from '../room-solution/create-room-solution.dto';
import { Type } from 'class-transformer';
import { CostEstimationStatusEnum } from '../../enums/cost-estimation-status.enum';
import { ProfessionalDeclineResponseEnum } from '../../enums/professional-decline-response.enum';

export class CreateCostEstimationDto {
    @ApiProperty({ enum: CostEstimationStatusEnum })
    @IsEnum(CostEstimationStatusEnum)
    status: CostEstimationStatusEnum;

    @ApiProperty({ enum: ProfessionalDeclineResponseEnum })
    @IsEnum(ProfessionalDeclineResponseEnum)
    professionalDeclineResponse: ProfessionalDeclineResponseEnum;

    @ApiProperty()
    @Length(1, 70)
    beneficiaryAdjustmentResponse: string;

    @ApiProperty()
    estimatedTimeToExecute: number;

    @ApiProperty()
    professionalId: string;

    @ApiProperty()
    workRequestId: string;
}
