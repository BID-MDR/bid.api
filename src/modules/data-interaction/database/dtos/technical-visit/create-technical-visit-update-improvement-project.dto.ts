import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../entitites/user.entity';
import { Type } from 'class-transformer';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { TechnicalVisitStatusEnum } from '../../enums/technical-visit-status.enum';
import { TechnicalVisitTypeEnum } from '../../enums/technical-visit-type.enum';


export class CreateTechnicalVisitUpdateImprovementProjectDto {
    @ApiProperty()
    @Type(() => Date)
    from: Date;

    @ApiProperty({ required: false })
    @Type(() => Date)
    to?: Date;

    @ApiProperty()
    professionalId: string;
    professional: UserEntity;


    @ApiProperty({ required: false })
    beneficiaryId?: string;
    beneficiary?: UserEntity;



    @ApiProperty()
    workRequestId?: string;
    workRequest?: WorkRequestEntity;
    
    @ApiProperty()
    type?: TechnicalVisitTypeEnum;

    @ApiProperty()
    status?: TechnicalVisitStatusEnum;

    @ApiProperty()
    duration?: number;

    userCreate: any



}
