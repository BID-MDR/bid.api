import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UpdateRoomSolutionDto } from '../room-solution/update-room-solution.dto';
import { CreateConstructionDto } from './create-construction.dto';

export class UpdateConstructionDto extends PartialType(CreateConstructionDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    id?: string;
}