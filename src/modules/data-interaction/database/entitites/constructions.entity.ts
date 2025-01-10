import {  Column, Entity, OneToOne } from "typeorm";
import { DemandEntity } from "./demand.entity";
import { BaseEntity } from "../../../../core/entities/base.entity";
import { ConstructionsTypeEnum } from "../enums/constructions-type.status";
import { ConstructionsStatusEnum } from "../enums/constructions-stauts.enum";
import { UserProgramTypeEnum } from "../enums/user-program-type.enum";

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

  @Column({
    type:'enum',
    enum: ConstructionsStatusEnum,
    default: ConstructionsStatusEnum.EM_ANDAMENTO,
  })
  status: ConstructionsStatusEnum;

  @Column({
    type: "enum",
    enum: UserProgramTypeEnum,
    nullable: true,
  })
  programType: UserProgramTypeEnum;
}