import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';
import { CreateUserGeneratedMediaDto } from './create-user-generated-media.dto';

export class UpdateUserGeneratedMediaDto extends PartialType(CreateUserGeneratedMediaDto) {
    @ApiProperty()
    @IsBoolean()
    remove: boolean;

    @ApiProperty()
    @IsUUID()
    id: string;
}
