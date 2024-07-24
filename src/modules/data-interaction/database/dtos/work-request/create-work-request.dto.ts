import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsEnum,
    IsOptional,
    IsPositive,
    IsString,
    Length,
    ValidateNested
} from 'class-validator';
import { PropertyTypeEnum } from '../../enums/property-type.enum';
import { CreateWorkRequestWelfareProgramDto } from './work-request-welfare-program/create-work-request-welfare-program.dto';
import { CreateWorkRequestPrevailingConstructionMaterialDto } from './work-request-prevailing-construction-material/create-work-request-prevailing-construction-material.dto';
import { CreateWorkRequestRoomTypeQuantityDto } from './work-request-room-type-quantity/create-work-request-room-type-quantity.dto';
import { CreateWorkRequestRoomToWorkDto } from './work-request-room-to-work/create-work-request-room-to-work.dto';
import { CreateWorkRequestPrecarityDto } from './work-request-precarity/create-work-request-precarity.dto';
import { CreateUserGeneratedMediaDto } from '../user/user-generated-media/create-user-generated-media.dto';
import { CreateAddressDto } from '../address/create-address.dto';
import { UserEntity } from '../../entitites/user.entity';
import { WorkRequestTypeEnum } from '../../enums/work-request-type.enum';
import { UserProgramTypeEnum } from '../../enums/user-program-type.enum';

export class CreateWorkRequestDto {
    @ApiProperty()
    @Length(3, 100)
    description: string;

    @ApiProperty({ example: 1 })
    @IsPositive()
    numberOfResidents: number;

    @ApiProperty()
    @Length(3, 70)
    responsiblePersonName: string;

    @ApiProperty({ type: CreateWorkRequestWelfareProgramDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateWorkRequestWelfareProgramDto)
    welfarePrograms: CreateWorkRequestWelfareProgramDto[];

    @ApiProperty({ enum: PropertyTypeEnum })
    @IsEnum(PropertyTypeEnum)
    propertyType: PropertyTypeEnum;

    @ApiProperty({ example: 1 })
    @IsPositive()
    floorCount: number;

    @ApiProperty({ type: CreateWorkRequestPrevailingConstructionMaterialDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateWorkRequestPrevailingConstructionMaterialDto)
    prevalingConstructionMaterials: CreateWorkRequestPrevailingConstructionMaterialDto[];

    @ApiProperty({ type: CreateWorkRequestRoomTypeQuantityDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateWorkRequestRoomTypeQuantityDto)
    roomsAvailableAndQuantity: CreateWorkRequestRoomTypeQuantityDto[];

    @ApiProperty({ type: CreateWorkRequestRoomToWorkDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateWorkRequestRoomToWorkDto)
    roomsToBeWorked: CreateWorkRequestRoomToWorkDto[];

    @ApiProperty({ type: CreateWorkRequestPrecarityDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateWorkRequestPrecarityDto)
    precaritysToBeSolved: CreateWorkRequestPrecarityDto[];

    @ApiProperty({ type: CreateAddressDto })
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

    @ApiProperty()
    @Length(3, 100)
    aditionalInformation: string;

    @ApiProperty({ type: CreateUserGeneratedMediaDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateUserGeneratedMediaDto)
    picturesAndVideos: CreateUserGeneratedMediaDto[];

    beneficiary: UserEntity

    @ApiProperty({ enum: WorkRequestTypeEnum })
    @IsEnum(WorkRequestTypeEnum)
    status: WorkRequestTypeEnum;

    @ApiProperty()
    @IsOptional()
    @IsString()
    document: string;

    programType: UserProgramTypeEnum;
}
