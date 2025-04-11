import { BaseEntity } from "src/core/entities/base.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { WorkRequestEntity } from "./work-request.entity";
import { TechnicalVisitEntity } from "./technical-visit.entity";
import { SurveyStatusEnum } from "../enums/survey-status.enum";
import { RoomEntity } from "./room.entity";
import { UserGeneratedMediaEntity } from "./user-generated-media.entity";

@Entity({ name: "survey" })
export class SurveyEntity extends BaseEntity {

  @OneToOne(() => UserEntity, (user) => user.surveyProfessional)
  professional: UserEntity;

  @OneToOne(() => UserEntity, user => user.surveybeneficiary, {
  })
  beneficiary?: UserEntity;

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
    length: 30,
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
    enum: Object.values(SurveyStatusEnum),
    default: SurveyStatusEnum.REALIZADA,
  })
  status: SurveyStatusEnum;

  @CreateDateColumn({
    nullable: true,
  })
  conclusionDate: Date;

  @OneToOne(() => WorkRequestEntity, workRequest => workRequest.demand, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  workRequest?: WorkRequestEntity;

  @OneToOne(() => TechnicalVisitEntity, technical => technical.demand, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  technicalVisit?: TechnicalVisitEntity;

  @Column({
    type: "int",
  })
  howManyPeopleLive: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  responsible: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  benefits: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  living: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  houseType: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  flooring: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  houseBuilt: string;

  @OneToMany(() => RoomEntity, (room) => room.survey)
  rooms: RoomEntity[];

  @OneToMany(() => RoomEntity, (room) => room.surveyImproveRooms)
  improveRooms: RoomEntity[];

  @Column({
    type: "varchar",
    length: 100,
  })
  problems: string;

  @Column({
    type: "text",
  })
  description: string;

  @OneToMany(() => UserGeneratedMediaEntity, (userGeneratedMediaEntity) => userGeneratedMediaEntity.survey, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  photos?: UserGeneratedMediaEntity[];
}
