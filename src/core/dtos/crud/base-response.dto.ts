import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class BaseResponseDto {
    @ApiProperty({})
    @Expose()
    id!: string;

    @ApiProperty({})
    @Expose()
    createdAt!: Date;
}
