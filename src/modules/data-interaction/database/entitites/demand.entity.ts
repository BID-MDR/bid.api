import { BaseEntity } from "src/core/entities/base.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { WorkRequestEntity } from "./work-request.entity";
import { TechnicalVisitEntity } from "./technical-visit.entity";
import { DemandStatusEnum } from "../enums/demand-status.enum";
import { ConstructionsEntity } from "./constructions.entity";
import { CompanyEntity } from "./company.entity";
import { SustainabilityItensEntity } from "./sustainability-Itens.entity";

@Entity({ name: "demands" })
export class DemandEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 100,
  })
  document: string;

  @Column({
    type: "varchar",
    length: 2,
  })
  state: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  city: string;

  @Column({
    type: "varchar",
    length: 11,
  })
  zipcode: string;

  @Column({
    type: "varchar",
    length: 50,
    nullable: true,
  })
  complement: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  neighborhood: string;

  @Column({
    type: "varchar",
    length: 10,
  })
  number: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  street: string;

  @Column({
    type: "varchar",
    length: 30,
  })
  latitude: string;

  @Column({
    type: "varchar",
    length: 30,
  })
  longitude: string;

  @Column({
    type: "enum",
    enum: Object.values(DemandStatusEnum),
    default: DemandStatusEnum.RASCUNHO,
  })
  status: DemandStatusEnum;

  @CreateDateColumn({
    nullable: true,
  })
  conclusionDate: Date;

  //@ManyToOne(() => UserEntity, user => user.demands, {
  //})
  //beneficiary: UserEntity;

  @ManyToOne(() => CompanyEntity, company => company.demands, {
  })
  company: CompanyEntity;

  @OneToOne(() => WorkRequestEntity, workRequest => workRequest.demand, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  workRequest?: WorkRequestEntity;

  @OneToOne(() => TechnicalVisitEntity, technical => technical.demand, {
    nullable: true
  })
  @JoinColumn()
  technicalVisit?: TechnicalVisitEntity;

  @OneToOne(() => ConstructionsEntity, c => c.demand, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  construction?: ConstructionsEntity;

  @OneToOne(() => SustainabilityItensEntity, c => c.demand, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  sustainabilityItens?: SustainabilityItensEntity;
}
