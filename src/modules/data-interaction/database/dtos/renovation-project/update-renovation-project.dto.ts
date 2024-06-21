import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UpdateRoomSolutionDto } from '../room-solution/update-room-solution.dto';
import { DeepPartial } from 'typeorm';
import { CreateRenovationProjectDto } from './create-renovation-project.dto';
import { RenovationProjectEntity } from '../../entitites/renovation-project.entity';

export class UpdateRenovationProjectDto extends PartialType(CreateRenovationProjectDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    id?: string;
}