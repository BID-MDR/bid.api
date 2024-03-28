import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsEnum, IsUUID, Length, ValidateNested } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { CreateRoomSolutionDto } from '../room-solution/create-room-solution.dto';
import { Type } from 'class-transformer';
import { ConstructionStatusEnum } from '../../enums/construction-status.enum';

export class CreateConstructionDto {
    @ApiProperty({ enum: ConstructionStatusEnum })
    @IsEnum(ConstructionStatusEnum)
    status: ConstructionStatusEnum;

    @ApiProperty({ example: '1999-12-31' })
    @IsDefined()
    @IsDateString()
    concludedAt: string;

    @ApiProperty()
    @Length(200)
    artrrt: string;

    @ApiProperty()
    @Length(200)
    conclusionReport: string;

    @ApiProperty()
    @Length(200)
    conclusionProfessionalComment: string;

    @ApiProperty()
    @Length(200)
    renovationProjectId: string;

}
