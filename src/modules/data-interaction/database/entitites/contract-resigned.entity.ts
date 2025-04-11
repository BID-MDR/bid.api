import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';;
import { WorkRequestEntity } from './work-request.entity';
import { BidDocumentEntity } from './bid-document.entity';
import { UserProfessionalInfoEntity } from './user-professional-info.entity';
import { ContractResignedReasonEnum } from '../enums/contract-resigned-reason-enum.status';
import { ContractResignedStatusEnum } from '../enums/contract-resigned-stauts.enum';
import { UserEntity } from './user.entity';

@Entity({ name: 'contract_resigned' })
export class ContractResignedEntity extends BaseEntity {

  
    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.contractResignedList, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    workRequest: WorkRequestEntity;

    @OneToOne(() => BidDocumentEntity, (bidDocument) => bidDocument.contractResigned, {
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinColumn()
    bidDocument: BidDocumentEntity;
    
    @ManyToOne(() => UserEntity, (workRequest) => workRequest.contractResignedList)
    professional: UserEntity;

    @Column({
        type: "enum",
        enum:ContractResignedReasonEnum,
        nullable: true
      })
      reason: ContractResignedReasonEnum;

    @Column({
        type: 'varchar',
        nullable: true
    })
    otherReason: string;


    @Column({
      type: 'datetime',
      nullable: true
    })
    technicalvisit: Date;
    
    @Column({
      type: 'varchar',
      nullable: true,
      default: ''
    })
    owedValue: string;
    
    @Column({
      type:'enum',
      enum: ContractResignedStatusEnum,
      nullable: true
    })
    status: ContractResignedStatusEnum;
    
  
}
