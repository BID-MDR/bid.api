import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { LevelOfEducationEnum } from '../enums/level-of-education.enum';
import { MaritalStatusEnum } from '../enums/marital-status.enum';
import { RaceEnum } from '../enums/race.enum';
import { UserTypeEnum } from '../enums/user-type.enum';
import { AddressEntity } from './address.entity';
import { BeneficiaryUserInfoEntity } from './beneficiary-user-info.entity';
import { ProfessionalUserInfoEntity } from './professional-user-info.entity';
import { TechnicalVisitEntity } from './technical-visit.entity';

@Entity({ name: 'cost-estimation' })
export class CostEstimationEntity extends BaseEntity {
    
}
