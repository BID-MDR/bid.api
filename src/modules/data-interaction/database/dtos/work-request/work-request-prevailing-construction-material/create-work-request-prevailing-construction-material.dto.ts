import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PrevalingConstructionMaterialsEnum } from '../../../enums/prevailing-construction-materials.enum';

export class CreateWorkRequestPrevailingConstructionMaterialDto {
    @ApiProperty({ enum: PrevalingConstructionMaterialsEnum })
    @IsEnum(PrevalingConstructionMaterialsEnum)
    prevalingConstructionMaterial: PrevalingConstructionMaterialsEnum;
}
