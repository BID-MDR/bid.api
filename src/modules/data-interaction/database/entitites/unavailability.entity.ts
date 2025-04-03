import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './user.entity';
import { UnavailabilityRepetitionEnum } from '../enums/unavailability-repetition.enum';
import { UnavailabilityDaySettingEnum } from '../enums/unavailability-day-setting.enum';

@Entity({ name: 'unavailability' })
export class UnavailabilityEntity extends BaseEntity {
    @Column({ type: 'timestamp' , nullable: true})
    startDate: Date;
  
    @Column({ type: 'timestamp' , nullable: true})
    finishDate: Date;

    
    @Column({ type: 'text', nullable: true })
    reason: string;
  
    @ManyToOne(() => UserEntity, (usuario) => usuario.unavailabilityList, {
      onDelete: 'CASCADE',
    })
    user: UserEntity;


      @Column({
        type: "enum",
        enum: UnavailabilityRepetitionEnum,
        default: UnavailabilityRepetitionEnum.NONE,
      })
      repetition: UnavailabilityRepetitionEnum;

      @Column({
        type: "enum",
        enum: UnavailabilityDaySettingEnum,
        default: UnavailabilityDaySettingEnum.NONE,
      })
      daySetting: UnavailabilityDaySettingEnum;
}
