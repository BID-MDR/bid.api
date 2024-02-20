import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateWorkRequestPrevailingConstructionMaterialDto } from '../../dtos/work-request/work-request-prevailing-construction-material/create-work-request-prevailing-construction-material.dto';
import { UpdateWorkRequestPrevailingConstructionMaterialDto } from '../../dtos/work-request/work-request-prevailing-construction-material/update-work-request-prevailing-construction-material.dto';
import { WorkRequestPrevailingConstructionMaterialEntity } from '../../entitites/work-request-prevailing-construction-materials.entity';

@Injectable()
export class WorkRequestPrevailingContructionMaterialsRepository extends BaseRepository<
    WorkRequestPrevailingConstructionMaterialEntity,
    CreateWorkRequestPrevailingConstructionMaterialDto,
    UpdateWorkRequestPrevailingConstructionMaterialDto
> {
    constructor(
        @InjectRepository(WorkRequestPrevailingConstructionMaterialEntity)
        private repository: Repository<WorkRequestPrevailingConstructionMaterialEntity>,
    ) {
        super(repository);
    }
}
