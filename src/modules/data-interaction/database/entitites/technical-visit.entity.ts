import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TechnicalVisitStatusEnum } from '../enums/technical-visit-status.enum';
import { UserEntity } from './user.entity';
import { AddressEntity } from './address.entity';

@Entity({ name: 'technical_visit' })
export class TechnicalVisitEntity extends BaseEntity {
    @Column({
        type: 'datetime',
    })
    from: Date;

    @Column({
        type: 'datetime',
    })
    to: Date;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsAsProfessional)
    professional: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.technicalVisitsAsBeneficiary)
    beneficiary: UserEntity;

    //Demanda work

    @Column({
        type: 'enum',
        enum: TechnicalVisitStatusEnum,
        default: TechnicalVisitStatusEnum.PENDENTE,
    })
    status: TechnicalVisitStatusEnum;
}
