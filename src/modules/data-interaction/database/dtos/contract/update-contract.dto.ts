import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { UpdateRoomSolutionDto } from '../room-solution/update-room-solution.dto';
import { CreateContractDto } from './create-contract.dto';
import { ContractStatusEnum } from '../../enums/contract-status.enum';

export class UpdateContractDto extends OmitType(PartialType(CreateContractDto), [
    'validityFrom',
    'validityTo',
    'status'
]) {
    @ApiProperty({ required: false })
    @IsOptional()
    id?: string;

    @ApiProperty({ enum: ContractStatusEnum, required: false })
    @IsEnum(ContractStatusEnum)
    status?: ContractStatusEnum;

    @ApiProperty({ example: '1999-12-31', required: false })
    @IsDateString()
    validityFrom?: Date;

    @ApiProperty({ example: '1999-12-31', required: false })
    @IsDateString()
    validityTo?: Date;
}