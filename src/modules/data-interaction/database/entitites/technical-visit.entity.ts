import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TechnicalVisitStatusEnum } from '../enums/technical-visit-status.enum';
import { UserEntity } from './user.entity';
import { WorkRequestEntity } from './work-request.entity';
import { AddressEntity } from './address.entity';

@Entity({ name: 'technical-visit' })
export class TechnicalVisitEntity extends BaseEntity {
    @Column({
        type: 'datetime',
    })
    from: Date;

    @Column({
        type: 'datetime',
    })
    to: Date;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    cancelReason: string;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsCancelled)
    cancelledBy: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsRescheduled)
    rescheduledBy: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsAsProfessional)
    professional: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsAsBeneficiary)
    beneficiary: UserEntity;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.technicalVisits)
    workRequest: WorkRequestEntity;

    @ManyToOne(() => AddressEntity, (address) => address.techinicalVisits, {
        eager: true,
    })
    address: AddressEntity;

    @Column({
        type: 'enum',
        enum: TechnicalVisitStatusEnum,
        default: TechnicalVisitStatusEnum.PENDENTE,
    })
    status: TechnicalVisitStatusEnum;
}
