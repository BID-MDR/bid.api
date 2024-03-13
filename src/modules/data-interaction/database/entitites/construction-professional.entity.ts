import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ConstructionProfessionalFunctionEnum } from '../enums/construction-professional-function.enum';
import { RenovationProjectEntity } from './renovation-project.entity';

@Entity({ name: 'construction-professional' })
export class ConstructionProfessionalEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 70,
    })
    name: string;

    @Column({
        type: 'enum',
        enum: ConstructionProfessionalFunctionEnum,
    })
    function: ConstructionProfessionalFunctionEnum;

    @ManyToOne(() => RenovationProjectEntity, (renovationProject) => renovationProject.constructionProfessionals)
    renovationProject: RenovationProjectEntity;
}
