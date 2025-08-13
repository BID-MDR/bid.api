import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Max,
    Min,
    IsEnum,
    ValidateNested,
} from "class-validator";
import { FlooringEnum } from "../../enums/flooring.enum";
import { KinshipEnum } from "../../enums/kinship.enum";
import { PropertyTypeEnum } from "../../enums/property-type.enum";
import { MediaUploadDto } from "../media/media-upload.dto";
import { Type } from "class-transformer";
import { CreateRoomDto } from "../room/create-room.dto";
import { SolvedProblemsEnum } from "../../enums/solved-problems.enum";

export class UpdateWorkRequestDto {
    @ApiProperty()
    @IsString()
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

    @ApiProperty({ type: [MediaUploadDto] })
    @ValidateNested()
    @Type(() => MediaUploadDto)
    selectedFiles?: MediaUploadDto[];

    pictures?: string[];

    @ApiProperty({ type: CreateRoomDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateRoomDto)
    improvementRoom?: CreateRoomDto[];

   @ApiProperty({ isArray: true, enum: SolvedProblemsEnum })
    solvedProblems?: SolvedProblemsEnum[];
}
