import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { TechnicalVisitStatusEnum } from '../enums/technical-visit-status.enum';
import { UserEntity } from './user.entity';
import { DemandEntity } from './demand.entity';
import { WorkRequestEntity } from './work-request.entity';
import { TechnicalVisitTypeEnum } from '../enums/technical-visit-type.enum';
import { RegisterWorkEntity } from './register-work.entity';
import { SurveyEntity } from './survey.entity';
import { ContractEntity } from './contract.entity';
import { ImprovementProjectEntity } from './improvement-project.entity';

@Entity({ name: 'technical_visit' })
export class TechnicalVisitEntity extends BaseEntity {
    @Column({
        type: 'datetime',
    })
    from: Date;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    to?: Date;

    @Column({
        type: 'float',
        nullable: true,
    })
    duration?: number;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsAsProfessional)
    professional: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsAsProfessional)
    userCreate: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsAsBeneficiary)
    beneficiary: UserEntity;

    @OneToOne(() => DemandEntity, (demand) => demand.technicalVisit, {
        nullable: true,
    })
    demand?: DemandEntity;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.technicalVisit)
    workRequest: WorkRequestEntity;

    @ManyToOne(() => ContractEntity, (contract) => contract.technicalVisit)
    contract: ContractEntity;

    @ManyToOne(() => ImprovementProjectEntity, (improvementProject) => improvementProject.technicalVisit)
    improvementProject: ImprovementProjectEntity

    @ManyToOne(() => RegisterWorkEntity, (registerWork) => registerWork.beginningTechnicalVisit)
    registerWorkBeginning: RegisterWorkEntity;

    @ManyToOne(() => RegisterWorkEntity, (registerWork) => registerWork.closureTechnicalVisit)
    registerWorkClosure: RegisterWorkEntity;

    @Column({
        type: 'enum',
        enum: TechnicalVisitStatusEnum,
        default: TechnicalVisitStatusEnum.PENDENTE,
    })
    status: TechnicalVisitStatusEnum;

    @Column({
        type: 'enum',
        enum: TechnicalVisitTypeEnum,
        default: TechnicalVisitTypeEnum.VISITA_TECNICA,
    })
    type: TechnicalVisitTypeEnum;

    @OneToOne(() => SurveyEntity, (survey) => survey.technicalVisit)
    survey?: SurveyEntity;

    @Column({
        type: 'text',
        nullable: true,
    })
    cancelReason: string;
}
