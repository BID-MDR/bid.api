import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsUUID } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';
import { Type } from 'class-transformer';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { TechnicalVisitStatusEnum } from '../../enums/technical-visit-status.enum';
import { TechnicalVisitTypeEnum } from '../../enums/technical-visit-type.enum';
import { RegisterWorkEntity } from '../../entitites/register-work.entity';
import { TechnicalVisitRegisterWorkEnum } from '../../enums/technical-visit-register-work-type.enum';

export class CreateTechnicalVisitDto {
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    from: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
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
    workRequestId?: string;
    workRequest?: WorkRequestEntity;
    
    @ApiProperty()
    type?: TechnicalVisitTypeEnum;

    @ApiProperty()
    status?: TechnicalVisitStatusEnum;

    @ApiProperty()
    duration?: number;

    @ApiProperty()
    @IsUUID()
    registerWorkBeginningId?: string;
    registerWorkBeginning?: RegisterWorkEntity;

    @ApiProperty()
    @IsUUID()
    registerWorkClosureId?: string;
    reregisterWorkClosure?: RegisterWorkEntity;

    @ApiProperty({ enum: TechnicalVisitRegisterWorkEnum })
    @IsEnum(TechnicalVisitRegisterWorkEnum)
    beginningOrEnd: TechnicalVisitRegisterWorkEnum;
}
