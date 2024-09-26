import { DemandEntity } from "./demand.entity";
import { BaseEntity } from "../../../../core/entities/base.entity";
import { ConstructionsTypeEnum } from "../enums/constructions-type.status";
import { ConstructionsStatusEnum } from "../enums/constructions-stauts.enum";
export declare class ConstructionsEntity extends BaseEntity {
    demand: DemandEntity;
    type: ConstructionsTypeEnum;
    description: string;
    area: number;
    status: ConstructionsStatusEnum;
}
