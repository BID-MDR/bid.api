import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateWorkRequestDto } from './create-work-request.dto';
import { UpdateWorkRequestPrecarityDto } from './work-request-precarity/update-work-request-precarity.dto';
import { UpdateWorkRequestPrevailingConstructionMaterialDto } from './work-request-prevailing-construction-material/update-work-request-prevailing-construction-material.dto';
import { UpdateWorkRequestRoomToWorkDto } from './work-request-room-to-work/update-work-request-room-to-work.dto';
import { UpdateWorkRequestRoomTypeQuantityDto } from './work-request-room-type-quantity/update-work-request-room-type-quantity.dto';
import { UpdateWorkRequestWelfareProgramDto } from './work-request-welfare-program/update-work-request-welfare-program.dto';
import { CreateUserGeneratedMediaDto } from '../user/user-generated-media/create-user-generated-media.dto';

export class UpdateWorkRequestDto extends OmitType(PartialType(CreateWorkRequestDto), [
    'picturesAndVideos',
    'precaritysToBeSolved',
    'welfarePrograms',
    'roomsToBeWorked',
    'roomsAvailableAndQuantity',
    'prevalingConstructionMaterials',
]) {
    @ApiProperty({ type: CreateUserGeneratedMediaDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateUserGeneratedMediaDto)
    picturesAndVideos: CreateUserGeneratedMediaDto[];

    @ApiProperty({ type: UpdateWorkRequestPrecarityDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateWorkRequestPrecarityDto)
    precaritysToBeSolved: UpdateWorkRequestPrecarityDto[];

    @ApiProperty({ type: UpdateWorkRequestRoomToWorkDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateWorkRequestRoomToWorkDto)
    roomsToBeWorked: UpdateWorkRequestRoomToWorkDto[];

    @ApiProperty({ type: UpdateWorkRequestRoomTypeQuantityDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateWorkRequestRoomTypeQuantityDto)
    roomsAvailableAndQuantity: UpdateWorkRequestRoomTypeQuantityDto[];

    @ApiProperty({ type: UpdateWorkRequestPrevailingConstructionMaterialDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateWorkRequestPrevailingConstructionMaterialDto)
    prevalingConstructionMaterials: UpdateWorkRequestPrevailingConstructionMaterialDto[];

    @ApiProperty({ type: UpdateWorkRequestWelfareProgramDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateWorkRequestWelfareProgramDto)
    welfarePrograms: UpdateWorkRequestWelfareProgramDto[];
}
