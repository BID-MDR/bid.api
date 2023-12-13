import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsCurrency,
    IsEnum,
    IsMilitaryTime,
    IsNumberString,
    IsPositive,
    IsUrl,
    Min,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { PortifolioTypeEnum } from '../../../enums/portifolio-type.enum';
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

    @ApiProperty({ required: false })
    @IsNumberString()
    @ValidateIf((o) => !o.cauRegistrationNumber)
    confeaRegistrationNumber: string;

    @ApiProperty({ required: false })
    @IsNumberString()
    @ValidateIf((o) => !o.confeaRegistrationNumber)
    cauRegistrationNumber: string;

    @ApiProperty()
    @IsCurrency({
        allow_decimal: true,
        digits_after_decimal: [1, 2],
        require_symbol: false,
        allow_negatives: false,
        symbol: 'R$',
    })
    @Min(0)
    laborValue: number;

    @ApiProperty({ type: CreateUserRestingDayDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateUserRestingDayDto)
    restingDays: CreateUserRestingDayDto[];

    @ApiProperty({ description: 'Horário militar', example: '08:00' })
    @IsMilitaryTime()
    worksFrom: string;

    @ApiProperty({ description: 'Horário militar', example: '18:00' })
    @IsMilitaryTime()
    worksTo: string;

    @ApiProperty({ description: 'KM', example: 1000 })
    @IsPositive()
    maximumDistanceToWorks: number;
}
