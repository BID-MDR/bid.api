import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsEnum, IsUUID, Length, ValidateNested } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { CreateRoomSolutionDto } from '../room-solution/create-room-solution.dto';
import { Type } from 'class-transformer';
import { ConstructionStatusEnum } from '../../enums/construction-status.enum';
import { ConstructionType } from '../../enums/construction-type.enum';
import { CreateAddressDto } from '../address/create-address.dto';

export class CreateConstructionDto {
    @ApiProperty({ enum: ConstructionStatusEnum })
    @IsEnum(ConstructionStatusEnum)
    status: ConstructionStatusEnum;

    @ApiProperty({ example: '1999-12-31' })
    @IsDefined()
    @IsDateString()
    concludedAt: string;

    @ApiProperty()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

    @ApiProperty()
    @Type(() => CreateRoomSolutionDto)
    rooms: CreateRoomSolutionDto[];

    @ApiProperty()
    artrrt?: string | null;

    @ApiProperty()
    conclusionReport?: string | null;

    @ApiProperty()
    conclusionProfessionalComment?: string | null;

    // @ApiProperty()
    // renovationProjectId?: string | null;

    @ApiProperty({ enum: ConstructionType })
    @IsEnum(ConstructionType)
    type?: ConstructionType | null;


    @ApiProperty()
    description?: string | null;

}
