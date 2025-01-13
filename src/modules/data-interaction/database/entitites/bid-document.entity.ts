import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne} from 'typeorm';;
import { BidDocumentEnum } from '../enums/bid-document.enum';
import { ImprovementProjectEntity } from './improvement-project.entity';

@Entity({ name: 'bid_document' })
export class BidDocumentEntity extends BaseEntity {

    @Column({
        type: "varchar",
        length: 255,
    })
    documentLink: string;

    @Column({
        type: 'enum',
        enum: BidDocumentEnum,
    })
    status: BidDocumentEnum;

    @OneToOne(() => ImprovementProjectEntity, (bidDocument) => bidDocument.document, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    project: ImprovementProjectEntity;

}
