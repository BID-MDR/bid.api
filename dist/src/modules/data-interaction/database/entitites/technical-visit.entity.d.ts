import { BaseEntity } from 'src/core/entities/base.entity';
import { TechnicalVisitStatusEnum } from '../enums/technical-visit-status.enum';
import { UserEntity } from './user.entity';
import { DemandEntity } from './demand.entity';
export declare class TechnicalVisitEntity extends BaseEntity {
    from: Date;
    to: Date;
    professional: UserEntity;
    beneficiary: UserEntity;
    demand: DemandEntity;
    status: TechnicalVisitStatusEnum;
}
