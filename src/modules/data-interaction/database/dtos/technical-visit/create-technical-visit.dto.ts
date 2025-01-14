import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsUUID } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';
import { Type } from 'class-transformer';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { TechnicalVisitStatusEnum } from '../../enums/technical-visit-status.enum';

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
    status?: TechnicalVisitStatusEnum;
}
