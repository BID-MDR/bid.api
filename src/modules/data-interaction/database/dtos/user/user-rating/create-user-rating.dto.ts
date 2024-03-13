import { ApiProperty } from '@nestjs/swagger';
import { UserRatingTypeEnum } from '../../../enums/user-rating-type.enum';

export class CreateUserRatingDto {
    @ApiProperty({})
    professionalId: string;

    @ApiProperty({})
    beneficiaryId: string;

    @ApiProperty({})
    profesisonalInterationRating: number;

    @ApiProperty({})
    programRating: number;

    @ApiProperty({})
    platformRating: number;

    @ApiProperty({ enum: UserRatingTypeEnum })
    type: UserRatingTypeEnum;
}
