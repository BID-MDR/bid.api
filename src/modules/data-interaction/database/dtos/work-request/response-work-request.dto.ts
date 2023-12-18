import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { MediaTypeEnum } from '../../enums/media-type.enum';
import { PrecarityTypeEnum } from '../../enums/precarity-type.enum';
import { PrevalingConstructionMaterialsEnum } from '../../enums/prevailing-construction-materials.enum';
import { PropertyTypeEnum } from '../../enums/property-type.enum';
import { WelfareProgramEnum } from '../../enums/welfare-program.enum';
import { CostEstimationResponseDto } from '../cost-estimation/reponse-cost-estimation.dto';
import { TechnicalVisitResponseDto } from '../technical-visit/reponse-technical-visit.dto';

class WorkRequestMediaDto {
    @ApiProperty()
    url: string;

    @ApiProperty({ enum: MediaTypeEnum })
    type: MediaTypeEnum;
}

class WorkRequestPrecarityDto {
    @ApiProperty({ enum: PrecarityTypeEnum })
    precarity: PrecarityTypeEnum;
}

class WorkRequestRoomToWorkDto {
    @ApiProperty()
    room: string;
}

class WorkRequestRoomTypeQuantityDto {
    @ApiProperty()
    room: string;

    @ApiProperty()
    quantity: number;
}

class WorkRequestPrevailingConstructionMaterialDto {
    @ApiProperty({ enum: PrevalingConstructionMaterialsEnum })
    prevalingConstructionMaterial: PrevalingConstructionMaterialsEnum;
}

class WorkRequestWelfareProgramDto {
    @ApiProperty({ enum: WelfareProgramEnum })
    welfareProgram: WelfareProgramEnum;
}

export class WorkRequestResponseDto {
    @ApiProperty()
    description: string;

    @ApiProperty()
    numberOfResidents: number;

    @ApiProperty()
    responsiblePersonName: string;

    @ApiProperty({ type: WorkRequestWelfareProgramDto, isArray: true })
    welfarePrograms: WorkRequestWelfareProgramDto[];

    @ApiProperty({ enum: PropertyTypeEnum })
    propertyType: PropertyTypeEnum;

    @ApiProperty()
    floorCount: number;

    @ApiProperty({ type: WorkRequestPrevailingConstructionMaterialDto, isArray: true })
    prevalingConstructionMaterials: WorkRequestPrevailingConstructionMaterialDto[];

    @ApiProperty({ type: WorkRequestRoomTypeQuantityDto, isArray: true })
    roomsAvailableAndQuantity: WorkRequestRoomTypeQuantityDto[];

    @ApiProperty({ type: WorkRequestRoomToWorkDto, isArray: true })
    roomsToBeWorked: WorkRequestRoomToWorkDto[];

    @ApiProperty({ type: WorkRequestPrecarityDto, isArray: true })
    precaritysToBeSolved: WorkRequestPrecarityDto[];

    @ApiProperty()
    aditionalInformation: string;

    @ApiProperty({ type: WorkRequestMediaDto, isArray: true })
    picturesAndVideos: WorkRequestMediaDto[];

    @Exclude()
    technicalVisits: TechnicalVisitResponseDto[];

    @Exclude()
    costEstimations: CostEstimationResponseDto[];
}
