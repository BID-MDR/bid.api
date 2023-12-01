import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MediaTypeEnum } from '../enums/media-type.enum';
import { WorkRequestEntity } from './work-request.entity';

@Entity({ name: 'work-request-media' })
export class WorkRequestMediaEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 200,
    })
    url: string;

    @Column({
        type: 'enum',
        enum: MediaTypeEnum,
    })
    type: MediaTypeEnum;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.picturesAndVideos)
    workRequest: WorkRequestEntity;
}
