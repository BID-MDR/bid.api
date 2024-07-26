import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../../../core/entities/base.entity";
import { DemandEntity } from "./demand.entity";

@Entity({ name: "work_request" })
export class WorkRequestEntity extends BaseEntity {

  @OneToOne(() => DemandEntity, (demand) => demand.workRequest)
  demand: DemandEntity;

}