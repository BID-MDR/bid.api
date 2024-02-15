import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsCurrency,
    IsDefined,
    IsEnum,
    IsMilitaryTime,
    IsNumberString,
    IsPositive,
    IsUrl,
    Length,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { PortifolioTypeEnum } from '../../../enums/portifolio-type.enum';
import { CreateAddressDto } from '../../address/create-address.dto';
import { CreateUserRestingDayDto } from '../user-resting-day/create-user-resting-day.dto';

export class CreateUserProfessionalInfoDto {
    @ApiProperty({ enum: PortifolioTypeEnum })
    @IsEnum(PortifolioTypeEnum)
    portifolioType: PortifolioTypeEnum;

    @ApiProperty({ example: 'https://www.linkedin.com/in/username' })
    @IsUrl({
        allow_fragments: true,
        require_protocol: true,
        allow_protocol_relative_urls: true,
        allow_query_components: true,
        allow_underscores: true,
    })
    portifolioLink: string;

    @ApiProperty({ description: 'Maximo de 500 chars' })
    @Length(1, 500)
    about: string;

    @ApiProperty()
    @IsPositive()
    gradYear: number;

    @ApiProperty()
    @IsPositive()
    gradMonth: number;

    @ApiProperty({ required: false })
    @IsNumberString()
    @ValidateIf((o) => !o.cauRegistrationNumber)
    confeaRegistrationNumber: string;

    @ApiProperty({ required: false })
    @IsNumberString()
    @ValidateIf((o) => !o.confeaRegistrationNumber)
    cauRegistrationNumber: string;

    @ApiProperty({ type: CreateUserRestingDayDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateUserRestingDayDto)
    @IsDefined()
    restingDays: CreateUserRestingDayDto[];

    @ApiProperty({ description: 'Horário militar', example: '08:00' })
    @IsMilitaryTime()
    worksFrom: string;

    @ApiProperty({ description: 'Horário militar', example: '18:00' })
    @IsMilitaryTime()
    worksTo: string;

    @ApiProperty({ type: CreateAddressDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    addresses: CreateAddressDto[];
}
