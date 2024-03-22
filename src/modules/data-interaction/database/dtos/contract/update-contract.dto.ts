import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UpdateRoomSolutionDto } from '../room-solution/update-room-solution.dto';
import { CreateContractDto } from './create-contract.dto';

export class UpdateContractDto extends PartialType(CreateContractDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    id?: string;
}