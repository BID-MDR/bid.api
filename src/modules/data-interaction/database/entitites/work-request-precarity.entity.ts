import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrecarityTypeEnum } from '../enums/precarity-type.enum';
import { WorkRequestEntity } from './work-request.entity';

@Entity({ name: 'work-request-precarity' })
export class WorkRequestPrecarityEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: PrecarityTypeEnum,
    })
    precarity: PrecarityTypeEnum;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.precaritysToBeSolved)
    workRequest: WorkRequestEntity;
}
