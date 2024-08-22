import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UpdateRoomSolutionDto } from '../room-solution/update-room-solution.dto';
import { CreateCostEstimationDto } from './create-cost-estimation.dto';

export class UpdateCostEstimationDto extends OmitType(CreateCostEstimationDto, ['roomsSolutions']) {
    @ApiProperty({ type: UpdateRoomSolutionDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateRoomSolutionDto)
    @IsOptional()
    roomsSolutions: UpdateRoomSolutionDto[];
}
