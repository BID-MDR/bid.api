import { DemandEntity } from "../../entitites/demand.entity";
import { KinshipEnum } from "../../enums/kinship.enum";
import { PropertyTypeEnum } from "../../enums/property-type.enum";
import { FlooringEnum } from "../../enums/flooring.enum";
import { PrevalingConstructionMaterialsEnum } from "../../enums/prevailing-construction-materials.enum";
import { WelfareProgramEnum } from "../../enums/welfare-program.enum";
import { CreateRoomDto } from "../room/create-room.dto";
declare class CreateWorkRequestWelfareProgramDto {
    welfareProgram: WelfareProgramEnum;
}
export declare class CreateWorkRequestDto {
    demandId: string;
    demand: DemandEntity;
    description: string;
    responsiblePersonName: string;
    resident: number;
    kinship: KinshipEnum;
    propertyType: PropertyTypeEnum;
    flooring: FlooringEnum;
    prevailingConstructionMaterials: PrevalingConstructionMaterialsEnum;
    welfare: CreateWorkRequestWelfareProgramDto[];
    room: CreateRoomDto[];
}
export {};
