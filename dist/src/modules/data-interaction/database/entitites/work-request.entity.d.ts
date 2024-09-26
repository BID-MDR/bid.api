import { BaseEntity } from "../../../../core/entities/base.entity";
import { FlooringEnum } from "../enums/flooring.enum";
import { KinshipEnum } from "../enums/kinship.enum";
import { PrevalingConstructionMaterialsEnum } from "../enums/prevailing-construction-materials.enum";
import { PropertyTypeEnum } from "../enums/property-type.enum";
import { DemandEntity } from "./demand.entity";
import { RoomEntity } from "./room.entity";
import { WorkRequestWelfareEntity } from "./work-request-welfare.entity";
import { TechnicalVisitStatusEnum } from "../enums/technical-visit-status.enum";
import { SatisfactionResearchEntity } from "./satisfaction-research.entity";
export declare class WorkRequestEntity extends BaseEntity {
    demand: DemandEntity;
    description: string;
    resident: number;
    responsiblePersonName: string;
    kinship: KinshipEnum;
    propertyType: PropertyTypeEnum;
    flooring: FlooringEnum;
    prevailingConstructionMaterials: PrevalingConstructionMaterialsEnum;
    room: RoomEntity[];
    welfare: WorkRequestWelfareEntity[];
    status: TechnicalVisitStatusEnum;
    satisfaction: SatisfactionResearchEntity;
}
