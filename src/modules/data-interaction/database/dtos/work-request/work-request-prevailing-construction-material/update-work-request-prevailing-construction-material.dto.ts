import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { CreateWorkRequestPrevailingConstructionMaterialDto } from './create-work-request-prevailing-construction-material.dto';

export class UpdateWorkRequestPrevailingConstructionMaterialDto extends IntersectionType(
    CreateWorkRequestPrevailingConstructionMaterialDto,
) {
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    remove: boolean;

    @ApiProperty()
    @IsUUID()
    @IsOptional()
    id?: string;
}
