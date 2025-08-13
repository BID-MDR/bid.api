import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';;
import { WorkRequestEntity } from './work-request.entity';
import { RegisterWorkStatusEnum } from '../enums/register-work.enum';
import { BidDocumentEntity } from './bid-document.entity';
import { UserProfessionalInfoEntity } from './user-professional-info.entity';
import { ConstructionsEntity } from './constructions.entity';
import { ConstructionsStatusEnum } from '../enums/constructions-stauts.enum';
import { UserProgramTypeEnum } from '../enums/user-program-type.enum';
import { ConstructionsTypeEnum } from '../enums/constructions-type.status';
import { TechnicalVisitEntity } from './technical-visit.entity';
import { UserEntity } from './user.entity';
import { SustainabilityItensEntity } from './sustainability-Itens.entity';

@Entity({ name: 'register_work' })
export class RegisterWorkEntity extends BaseEntity {

  
    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.registerWork, {
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinColumn()
    workRequest: WorkRequestEntity;

    @OneToOne(() => BidDocumentEntity, (bidDocument) => bidDocument.registerWork, {
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinColumn()
    bidDocument: BidDocumentEntity;

    @Column({
        type: "enum",
        enum:ConstructionsTypeEnum,
        default: ConstructionsTypeEnum.REGULARIZABLE_AREA,
      })
    type: ConstructionsTypeEnum;

    @ManyToOne(() => UserEntity, (user) => user.registerWorkList, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
  })
    professional: UserEntity;

    @Column({
        type: 'datetime',
        nullable: true
    })
    startedDate: Date;

    @Column({
        type: 'datetime',
        nullable: true

    })
    concludedDate: Date;

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
        default: ConstructionsStatusEnum.TO_SCHEDULE_REGISTRATION,
      })
      status: ConstructionsStatusEnum;
    
      @Column({
        type: "enum",
        enum: UserProgramTypeEnum,
        default: UserProgramTypeEnum.MINHA_CASA
      })
      programType: UserProgramTypeEnum;

      @OneToMany(() => TechnicalVisitEntity, technicalVisit => technicalVisit.registerWorkBeginning, {
      eager: true,
      })
      beginningTechnicalVisit: TechnicalVisitEntity;

      @OneToMany(() => TechnicalVisitEntity, technicalVisit => technicalVisit.registerWorkClosure, {
      eager: true,
      })
      closureTechnicalVisit: TechnicalVisitEntity;

      
      @OneToOne(() => SustainabilityItensEntity, c => c.registerWork, {
          nullable: true,
          cascade: true,
        })
        @JoinColumn()
        sustainabilityItens?: SustainabilityItensEntity;

}
