import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export abstract class BaseResponseDto {
    @ApiProperty({})
    @Expose()
    @Type(() => String)
    _id!: string;

    @Exclude()
    __v?: string;

    @ApiProperty({})
    @Expose()
    createdAt!: Date;

    @ApiProperty({})
    @Expose()
    deleted!: boolean;

    @ApiProperty({})
    @Expose()
    deletable!: boolean;

    @ApiProperty({})
    @Expose()
    updatedAt!: Date;
}
