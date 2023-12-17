import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, ValidateNested } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';
import { WorkRequestEntity } from '../../entitites/work-request.entity';
import { CreateRoomSolutionDto } from '../room-solution/create-room-solution.dto';
import { Type } from 'class-transformer';

export class CreateCostEstimationDto {
    professionalId: string;
    professional: UserEntity;

    @ApiProperty()
    @IsUUID()
    workRequestId: string;
    workRequest: WorkRequestEntity;

    @ApiProperty({ type: CreateRoomSolutionDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateRoomSolutionDto)
    roomsSolutions: CreateRoomSolutionDto[];

    @ApiProperty({ description: 'Tempo estimado para execução em dias' })
    estimatedTimeToExecute: number;
}
