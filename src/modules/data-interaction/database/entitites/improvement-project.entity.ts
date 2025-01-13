import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkRequestEntity } from './work-request.entity';
import { BidDocumentEntity } from './bid-document.entity';
import { ImprovementProjectStatusEnum } from '../enums/improvement-project-status.enum';
import { UserEntity } from './user.entity';

@Entity({ name: 'improvement_project' })
export class ImprovementProjectEntity extends BaseEntity {

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.costEstimates, {
        onDelete: 'CASCADE',
    })
    workRequest: WorkRequestEntity;

    @OneToOne(() => BidDocumentEntity, (bidDocument) => bidDocument.project, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    document: BidDocumentEntity;

    @Column({
        type: 'enum',
        enum: ImprovementProjectStatusEnum,
    })
    status: ImprovementProjectStatusEnum;

    @ManyToOne(() => UserEntity, user => user.projects, {
    })
    professional?: UserEntity;

}
