import { ApiProperty } from "@nestjs/swagger";
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
    Max,
    Min,
    ValidateNested,
} from "class-validator";
import { DemandEntity } from "../../entitites/demand.entity";
import { KinshipEnum } from "../../enums/kinship.enum";
import { PropertyTypeEnum } from "../../enums/property-type.enum";
import { FlooringEnum } from "../../enums/flooring.enum";
import { PrevalingConstructionMaterialsEnum } from "../../enums/prevailing-construction-materials.enum";
import { Type } from "class-transformer";
import { WelfareProgramEnum } from "../../enums/welfare-program.enum";
import { CreateRoomDto } from "../room/create-room.dto";

class CreateWorkRequestWelfareProgramDto {
    @ApiProperty({ enum: WelfareProgramEnum })
    @IsNotEmpty()
    @IsEnum(WelfareProgramEnum)
    welfareProgram: WelfareProgramEnum;
}

export class CreateWorkRequestDto {
    @ApiProperty()
    @IsUUID()
    demandId: string;
    demand: DemandEntity;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    responsiblePersonName: string;

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

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(PrevalingConstructionMaterialsEnum)
    prevailingConstructionMaterials: PrevalingConstructionMaterialsEnum;

    @ApiProperty({ type: CreateWorkRequestWelfareProgramDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateWorkRequestWelfareProgramDto)
    welfare: CreateWorkRequestWelfareProgramDto[];

    @ApiProperty({ type: CreateRoomDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateRoomDto)
    room: CreateRoomDto[];

}
