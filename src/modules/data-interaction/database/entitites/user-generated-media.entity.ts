import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MediaTypeEnum } from '../enums/media-type.enum';
import { RoomSolutionEntity } from './room-solution.entity';
@Entity({ name: 'user-generated-media' })
export class UserGeneratedMediaEntity extends BaseEntity {
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

    @ManyToOne(() => RoomSolutionEntity, (roomSolution) => roomSolution.picturesAndVideos)
    roomSolution: RoomSolutionEntity;
}
