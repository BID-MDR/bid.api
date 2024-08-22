import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsDefined, IsUUID, ValidateNested } from 'class-validator';
import { CreateUserProfessionalInfoDto } from './create-user-professional-info.dto';
import { CreateUserRestingDayDto } from '../user-resting-day/create-user-resting-day.dto';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../address/create-address.dto';

export class UpdateUserProfessionalInfoDto{
    @ApiProperty()
    @IsUUID()
    id!: string;

    @ApiProperty({ type: CreateUserRestingDayDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateUserRestingDayDto)
    @IsDefined()
    restingDays: CreateUserRestingDayDto[];

    @ApiProperty({ type: CreateAddressDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    addresses: CreateAddressDto[];

    
}
