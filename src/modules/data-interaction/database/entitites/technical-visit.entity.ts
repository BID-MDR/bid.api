import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { WorkRequestEntity } from './work-request.entity';
import { TechnicalVisitStatusEnum } from '../enums/technical-visit-status.enum';

@Entity({ name: 'technical-visit' })
export class TechnicalVisitEntity extends BaseEntity {
    @Column({
        type: 'datetime',
    })
    when: Date;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsAsProfessional)
    professional: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsAsBeneficiary)
    beneficiary: UserEntity;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.technicalVisits)
    workRequest: WorkRequestEntity;

    @Column({
        type: 'enum',
        enum: TechnicalVisitStatusEnum,
        default: TechnicalVisitStatusEnum.PENDENTE,
    })
    status: TechnicalVisitStatusEnum;
}
