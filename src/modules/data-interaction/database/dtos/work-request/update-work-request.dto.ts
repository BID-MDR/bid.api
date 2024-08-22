import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateWorkRequestDto } from './create-work-request.dto';
import { UpdateWorkRequestPrecarityDto } from './work-request-precarity/update-work-request-precarity.dto';
import { UpdateWorkRequestPrevailingConstructionMaterialDto } from './work-request-prevailing-construction-material/update-work-request-prevailing-construction-material.dto';
import { UpdateWorkRequestRoomToWorkDto } from './work-request-room-to-work/update-work-request-room-to-work.dto';
import { UpdateWorkRequestRoomTypeQuantityDto } from './work-request-room-type-quantity/update-work-request-room-type-quantity.dto';
import { UpdateWorkRequestWelfareProgramDto } from './work-request-welfare-program/update-work-request-welfare-program.dto';
import { UpdateUserGeneratedMediaDto } from '../user/user-generated-media/update-user-generated-media.dto';
import { UpdateAddressDto } from '../address/update-address.dto';

export class UpdateWorkRequestDto{
    @ApiProperty({ type: UpdateAddressDto })
    @ValidateNested()
    @Type(() => UpdateAddressDto)
    address: UpdateAddressDto;

    @ApiProperty({ type: UpdateUserGeneratedMediaDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateUserGeneratedMediaDto)
    @IsOptional()
    picturesAndVideos?: UpdateUserGeneratedMediaDto[];

    @ApiProperty({ type: UpdateWorkRequestPrecarityDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateWorkRequestPrecarityDto)
    @IsOptional()
    precaritysToBeSolved?: UpdateWorkRequestPrecarityDto[];

    @ApiProperty({ type: UpdateWorkRequestRoomToWorkDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateWorkRequestRoomToWorkDto)
    @IsOptional()
    roomsToBeWorked?: UpdateWorkRequestRoomToWorkDto[];

    @ApiProperty({ type: UpdateWorkRequestRoomTypeQuantityDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateWorkRequestRoomTypeQuantityDto)
    @IsOptional()
    roomsAvailableAndQuantity?: UpdateWorkRequestRoomTypeQuantityDto[];

    @ApiProperty({ type: UpdateWorkRequestPrevailingConstructionMaterialDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateWorkRequestPrevailingConstructionMaterialDto)
    @IsOptional()
    prevalingConstructionMaterials?: UpdateWorkRequestPrevailingConstructionMaterialDto[];

    @ApiProperty({ type: UpdateWorkRequestWelfareProgramDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateWorkRequestWelfareProgramDto)
    @IsOptional()
    welfarePrograms?: UpdateWorkRequestWelfareProgramDto[];
}
