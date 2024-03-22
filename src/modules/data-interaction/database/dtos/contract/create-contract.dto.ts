import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsEnum, IsUUID, Length, ValidateNested } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { CreateRoomSolutionDto } from '../room-solution/create-room-solution.dto';
import { Type } from 'class-transformer';
import { ContractStatusEnum } from '../../enums/contract-status.enum';

export class CreateContractDto {
    @ApiProperty({ enum: ContractStatusEnum })
    @IsEnum(ContractStatusEnum)
    status: ContractStatusEnum;

    @ApiProperty({ example: '1999-12-31' })
    @IsDefined()
    @IsDateString()
    validityFrom: string;

    @ApiProperty({ example: '1999-12-31' })
    @IsDefined()
    @IsDateString()
    validityTo: string;

    @ApiProperty()
    @Length(200)
    professionalCancelMessage: string;

    @ApiProperty({ example: '1999-12-31' })
    @IsDefined()
    @IsDateString()
    professionalDeliveredContractToBeneficiaryAt: string;

    @ApiProperty()
    @Length(36)
    costEstimationId: string;

}
