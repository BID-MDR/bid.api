import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Max,
    Min,
    IsEnum,
} from "class-validator";
import { FlooringEnum } from "../../enums/flooring.enum";
import { KinshipEnum } from "../../enums/kinship.enum";
import { PropertyTypeEnum } from "../../enums/property-type.enum";

export class UpdateWorkRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNumber()
    @Max(10)
    @Min(0)
    @IsNotEmpty()
    resident: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(KinshipEnum)
    kinship: KinshipEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(PropertyTypeEnum)
    propertyType: PropertyTypeEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(FlooringEnum)
    flooring: FlooringEnum;
}
