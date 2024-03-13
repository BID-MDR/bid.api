import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrevalingConstructionMaterialsEnum } from '../enums/prevailing-construction-materials.enum';
import { WorkRequestEntity } from './work-request.entity';

@Entity({ name: 'work-request-prevailing-construction-material' })
export class WorkRequestPrevailingConstructionMaterialEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: PrevalingConstructionMaterialsEnum,
    })
    prevalingConstructionMaterial: PrevalingConstructionMaterialsEnum;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.prevalingConstructionMaterials)
    workRequest: WorkRequestEntity;
}
