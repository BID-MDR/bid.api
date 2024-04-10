import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateRoomSolutionDto } from './create-room-solution.dto';
import { Type } from 'class-transformer';
import { IsCurrency, IsEnum, IsUUID } from 'class-validator';
import { CreateUserGeneratedMediaDto } from '../user/user-generated-media/create-user-generated-media.dto';

export class UpdateRoomSolutionDto extends  PartialType(
    OmitType(CreateRoomSolutionDto, ['cost', 'solution'] as const)
) {
    @ApiProperty({ type: String })
    @IsUUID() // Assuming 'id' is a UUID
    id: string; // Include the 'id' property
}
