import {  Column, Entity, OneToOne } from "typeorm";
import { DemandEntity } from "./demand.entity";
import { BaseEntity } from "../../../../core/entities/base.entity";
import { ConstructionsTypeEnum } from "../enums/constructions-type.status";

@Entity({ name: "constructions" })
export class ConstructionsEntity extends BaseEntity {
  @OneToOne(() => DemandEntity, demand => demand.construction)
  demand: DemandEntity;

  @Column({
    type: "enum",
    enum:ConstructionsTypeEnum,
    default: ConstructionsTypeEnum.REGULARIZABLE_AREA,
  })
  type: ConstructionsTypeEnum;

  @Column({
    type: "varchar",
    length: 255,
  })
  description: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  area: number;
}
