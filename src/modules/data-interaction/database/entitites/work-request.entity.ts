import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
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
import { HouseTypeEnum } from "../enums/house-type.enum";
import { UserEntity } from "./user.entity";
import { CostEstimateEntity } from "./cost-estimate.entity";
import { ContractEntity } from "./contract.entity";
import { RegisterWorkEntity } from "./register-work.entity";
import { TechnicalVisitEntity } from "./technical-visit.entity";
import { WorkRequestContractStatusEnum } from "../enums/work-request-contact-status.enum";
import { ContractResignedEntity } from "./contract-resigned.entity";
import { SurveyEntity } from "./survey.entity";
import { SolvedProblemsEnum } from "../enums/solved-problems.enum";

@Entity({ name: "work_request" })
export class WorkRequestEntity extends BaseEntity {
  @OneToOne(() => DemandEntity, demand => demand.workRequest)
  demand?: DemandEntity;

  @ManyToOne(() => UserEntity, user => user.workRequest, {
  })
  beneficiary?: UserEntity;

  @Column({
    type: "varchar",
    length: 50,
    default: "",
  })
  description: string;

  @Column({
    type: "tinyint",
  })
  resident: number;

  @Column({
    type: "varchar",
    length: 50,
    default: "",
  })
  responsiblePersonName: string;

  @Column({
    enum: KinshipEnum,
    type: "enum",
    default: KinshipEnum.Me,
  })
  kinship: KinshipEnum;

  @Column({
    enum: PropertyTypeEnum,
    type: "enum",
    default: PropertyTypeEnum.CASA,
  })
  propertyType: PropertyTypeEnum;

  @Column({
    enum: FlooringEnum,
    type: "enum",
    default: FlooringEnum.TERRIO,
  })
  flooring: FlooringEnum;

  @Column({
    type: "enum",
    enum: HouseTypeEnum,
    nullable: true,
    default: HouseTypeEnum.floors,
  })
  houseType?: HouseTypeEnum | null;

  @Column({
    enum: PrevalingConstructionMaterialsEnum,
    type: "enum",
    default: PrevalingConstructionMaterialsEnum.TIJOLO,
  })
  prevailingConstructionMaterials: PrevalingConstructionMaterialsEnum;

  @OneToMany(() => RoomEntity, room => room.workRequest, {
    cascade: true,
  })
  room: RoomEntity[];

  @OneToMany(() => RoomEntity, room => room.workRequestImprovementRoom, {
    cascade: true,
  })
  improvementRoom: RoomEntity[];
  
  @Column("simple-array", { nullable: true })
  solvedProblems: SolvedProblemsEnum[];

  @OneToMany(() => WorkRequestWelfareEntity, workRequestWelfare => workRequestWelfare.workRequest, {
    cascade: true,
  })
  welfare: WorkRequestWelfareEntity[];

  @Column({
    type: "enum",
    enum: TechnicalVisitStatusEnum,
    default: TechnicalVisitStatusEnum.PENDENTE,
  })
  status: TechnicalVisitStatusEnum;

  @Column({
    type: "enum",
    enum: WorkRequestContractStatusEnum,
    default: WorkRequestContractStatusEnum.NEW_DEMAND,
  })
  contractStatus: WorkRequestContractStatusEnum;

  @OneToMany(() => SatisfactionResearchEntity, satisfaction => satisfaction.workRequest, {
    cascade: true,
  })
  satisfaction: SatisfactionResearchEntity[];

  @OneToMany(() => CostEstimateEntity, (costEstimate) => costEstimate.workRequest, {
    cascade: true,
  })
  costEstimates: CostEstimateEntity[];

  @OneToMany(() => ContractEntity, (contract) => contract.workRequest)
  contracts: ContractEntity[];

  @OneToMany(() => RegisterWorkEntity, (contract) => contract.workRequest, {
    cascade: true,
  })
  @JoinColumn()
  registerWork: RegisterWorkEntity;

  @OneToMany(() => TechnicalVisitEntity, technicalVisit => technicalVisit.workRequest, {
  })
  technicalVisit: TechnicalVisitEntity[];

  @OneToMany(() => ContractResignedEntity, (contractResigned) => contractResigned.workRequest, {
    cascade: true,
  })
  contractResignedList: ContractResignedEntity[];

  @OneToOne(() => SurveyEntity, survey => survey.workRequest, {
  })
  survey: SurveyEntity;

  @Column("simple-array", { nullable: true })
  pictures: string[];


}
