import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined,IsEnum, IsUUID, Length, ValidateNested } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { CreateRoomSolutionDto } from '../room-solution/create-room-solution.dto';
import { Type } from 'class-transformer';
import { DocumentTypeEnum } from '../../enums/document-type.enum';
import { ProfessionalDeclineResponseEnum } from '../../enums/professional-decline-response.enum';

export class CreateRenovationProjectDto {
    @ApiProperty({ enum: DocumentTypeEnum })
    @IsEnum(DocumentTypeEnum)
    documentType: DocumentTypeEnum;

    @ApiProperty()
    documentUrl: string;

    @ApiProperty()
    constructionDescription: string;

    @ApiProperty({ example: '1999-12-31' })
    @IsDefined()
    @IsDateString()
    renovationWorkBenginAt: string;

    @ApiProperty({ example: '1999-12-31' })
    @IsDefined()
    @IsDateString()
    renovationWorkEndAt: string;

    @ApiProperty()
    renovationWorkWorkSchedule: string;

    @ApiProperty()
    contractId: string;

}
