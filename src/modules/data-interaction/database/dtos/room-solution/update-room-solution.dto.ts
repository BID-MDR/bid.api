import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomSolutionDto } from './create-room-solution.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateUserGeneratedMediaDto } from '../user/user-generated-media/create-user-generated-media.dto';

export class UpdateRoomSolutionDto extends PartialType(CreateRoomSolutionDto) {
    @ApiProperty({ type: CreateUserGeneratedMediaDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateUserGeneratedMediaDto)
    picturesAndVideos: CreateUserGeneratedMediaDto[];
}
