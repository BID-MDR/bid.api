import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { RoomTypeEnum } from '../enums/room-type.enum';
import { WelfareProgramEnum } from '../enums/welfare-program.enum';
import { WorkRequestEntity } from './work-request.entity';

@Entity({ name: 'work-request-welfare-program' })
export class WorkRequestWelfareProgramEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: RoomTypeEnum,
    })
    welfareProgram: WelfareProgramEnum;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.welfarePrograms)
    workRequest: WorkRequestEntity;
}
