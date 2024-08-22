import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CreateTechnicalVisitDto } from './create-technical-visit.dto';
import { IsDate, IsEnum, IsUUID, Length } from 'class-validator';
import { TechnicalVisitStatusEnum } from '../../enums/technical-visit-status.enum';
import { UserEntity } from '../../entitites/user.entity';
import { WorkRequestEntity } from '../../entitites/work-request.entity';

export class UpdateTechnicalVisitDto {

    @ApiProperty()
    @IsDate()
    from: Date;

    @ApiProperty()
    @IsDate()
    to: Date;

    @ApiProperty()
    @IsUUID()
    professionalId: string;
    professional: UserEntity;

    @ApiProperty()
    @IsUUID()
    beneficiaryId: string;
    beneficiary: UserEntity;

    @ApiProperty()
    @IsUUID()
    workRequestId: string;
    workRequest: WorkRequestEntity;

    @ApiProperty()
    @Length(3, 200)
    cancelReason: string;

    @ApiProperty()
    @IsEnum(TechnicalVisitStatusEnum)
    status: TechnicalVisitStatusEnum;
}
