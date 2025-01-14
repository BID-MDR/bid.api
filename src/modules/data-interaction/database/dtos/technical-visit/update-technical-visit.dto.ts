import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CreateTechnicalVisitDto } from './create-technical-visit.dto';
import { IsEnum, IsUUID, Length } from 'class-validator';
import { TechnicalVisitStatusEnum } from '../../enums/technical-visit-status.enum';
import { UserEntity } from '../../entitites/user.entity';

export class UpdateTechnicalVisitDto extends PickType(PartialType(CreateTechnicalVisitDto), ['to', 'from']) {
    @ApiProperty()
    @Length(3, 200)
    cancelReason: string;

    @ApiProperty()
    @IsEnum(TechnicalVisitStatusEnum)
    status: TechnicalVisitStatusEnum;

    @ApiProperty()
    @IsUUID()
    professionalId: string;
    professional: UserEntity;
}
