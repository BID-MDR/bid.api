import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UpdateRoomSolutionDto } from '../room-solution/update-room-solution.dto';
import { DeepPartial } from 'typeorm';
import { CreateCostEstimationDto } from './create-cost-estimation.dto';
import { CostEstimationEntity } from '../../entitites/cost-estimation.entity';

export class UpdateCostEstimationDto extends PartialType(CreateCostEstimationDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    id?: string;
}