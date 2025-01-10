import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity} from 'typeorm';;
import { BidDocumentEnum } from '../enums/bid-document.enum';

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

}
