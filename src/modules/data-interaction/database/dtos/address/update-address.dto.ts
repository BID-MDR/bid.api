import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { IsUUID } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    @ApiProperty()
    @IsUUID()
    id!: string;
}
