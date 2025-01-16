import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';
import { Type } from 'class-transformer';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { UserGeneratedMediaEntity } from '../../entitites/user-generated-media.entity';
import { RoomEntity } from '../../entitites/room.entity';
import { TechnicalVisitEntity } from '../../entitites/technical-visit.entity';
import { SurveyStatusEnum } from '../../enums/survey-status.enum';

export class CreateProfessionalSurveyDto {
    @ApiProperty()
    @IsUUID()
    professionalId: string;
  
    @ApiProperty()
    professional: UserEntity;
  
    @ApiProperty()
    @IsUUID()
    beneficiaryId: string;
  
    @ApiProperty()
    beneficiary: UserEntity;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    state: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    city: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    zipcode: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    complement: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    neighborhood: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    number: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    street: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    latitude: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    longitude: string;
  
    @ApiProperty()
    @IsEnum(SurveyStatusEnum)
    status: SurveyStatusEnum;
  
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    conclusionDate: Date;
  
    @ApiProperty()
    workRequest?: WorkRequestEntity;
  
    @ApiProperty()
    technicalVisit?: TechnicalVisitEntity;
  
    @ApiProperty()
    @IsInt()
    @IsOptional()
    howManyPeopleLive: number;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    responsible: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    benefits: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    living: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    houseType: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    flooring: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    houseBuilt: string;
  
    @ApiProperty({ type: [RoomEntity] })
    rooms: RoomEntity[];
  
    @ApiProperty({ type: [RoomEntity] })
    improveRooms: RoomEntity[];
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    problems: string;
  
    @ApiProperty()
    @IsString()
    description: string;
  
    @ApiProperty({ type: [UserGeneratedMediaEntity] })
    photos?: UserGeneratedMediaEntity[];
}
