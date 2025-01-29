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
    @Type(() => Date)
    from: Date;

    @ApiProperty({ required: false })
    @Type(() => Date)
    to?: Date;

    @ApiProperty()
    @IsUUID()
    professionalId: string;
    professional: UserEntity;

    @ApiProperty()
    @IsUUID()
    userCreateId: string;
    userCreate: UserEntity;

    @ApiProperty({ required: false })
    beneficiaryId?: string;
    beneficiary?: UserEntity;

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
    distanceInMeters?: number;

    @ApiProperty()
    registerWorkBeginningId?: string;
    registerWorkBeginning?: RegisterWorkEntity;

    @ApiProperty()
    registerWorkClosureId?: string;
    reregisterWorkClosure?: RegisterWorkEntity;

    @ApiProperty({ enum: TechnicalVisitRegisterWorkEnum })
    beginningOrEnd?: TechnicalVisitRegisterWorkEnum;

    @ApiProperty({example: 'CADASTRO_DE_OBRA || PROJETO_DE_MELHORIA | CONCLUSÃO_DE_OBRA'  })
    msgType?: string;
}
