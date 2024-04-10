import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { DocumentTypeEnum } from '../enums/document-type.enum';
import { ContractEntity } from './contract.entity';
import { ConstructionProfessionalEntity } from './construction-professional.entity';

@Entity({ name: 'renovation-project' })
export class RenovationProjectEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 50,
    })
    registryNumber: string;

    @Column({
        type: 'enum',
        enum: DocumentTypeEnum,
    })
    documentType: DocumentTypeEnum;

    @Column({
        type: 'varchar',
        length: 200,
    })
    documentUrl: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    constructionDescription: string;

    @Column({
        type: 'datetime',
    })
    renovationWorkBenginAt: Date;

    @Column({
        type: 'datetime',
    })
    renovationWorkEndAt: Date;

    @Column({
        type: 'varchar',
        length: 200,
    })
    renovationWorkWorkSchedule: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    contractId: string;
    @OneToMany(
        () => ConstructionProfessionalEntity,
        (constructionProfessional) => constructionProfessional.renovationProject,
        {
            eager: true,
            cascade: true,
        }
    )
    constructionProfessionals: ConstructionProfessionalEntity[];

    @OneToOne(() => ContractEntity, (contract) => contract.renovationProject, {
        eager: true,
    })
    @JoinColumn()
    contract: ContractEntity;
}
