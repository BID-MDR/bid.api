import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateRoomSolutionDto } from './create-room-solution.dto';
import { IsUUID } from 'class-validator';

export class UpdateRoomSolutionDto extends  PartialType(
    OmitType(CreateRoomSolutionDto, ['solution'] as const)
) {
    @ApiProperty({ type: String })
    @IsUUID() // Assuming 'id' is a UUID
    id: string; // Include the 'id' property
}
