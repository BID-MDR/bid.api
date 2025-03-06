import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDefined,
    IsEnum,
    IsMilitaryTime,
    IsNumberString,
    IsPositive,
    IsUrl,
    Length,
    Max,
    Min,
    ValidateIf,
    ValidateNested
} from 'class-validator';
import { PortifolioTypeEnum } from '../../../enums/portifolio-type.enum';
import { CreateAddressDto } from '../../address/create-address.dto';
import { CreateUserRestingDayDto } from '../user-resting-day/create-user-resting-day.dto';

export class CreateUserProfessionalInfoDto {
    @ApiProperty({ enum: PortifolioTypeEnum })
    @IsEnum(PortifolioTypeEnum)
    portifolioType: PortifolioTypeEnum;

    @ApiProperty({ example: 'https://www.linkedin.com/in/username', required: false, nullable: true })
    @ValidateIf((o) => o.portifolioLink && o.portifolioLink.trim() !== '')
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

    @ApiProperty({ minimum: 1900, maximum: new Date().getFullYear() })
    @Min(1900)
    @Max(new Date().getFullYear()+1)
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

    @ApiProperty({ type: CreateUserRestingDayDto, isArray: true, nullable: true })
    restingDays?: CreateUserRestingDayDto[];

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
