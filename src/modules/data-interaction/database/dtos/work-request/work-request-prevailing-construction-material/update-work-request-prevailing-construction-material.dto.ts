import { PartialType } from '@nestjs/swagger';
import { CreateWorkRequestPrevailingConstructionMaterialDto } from './create-work-request-prevailing-construction-material.dto';

export class UpdateWorkRequestPrevailingConstructionMaterialDto extends PartialType(
    CreateWorkRequestPrevailingConstructionMaterialDto,
) {}
