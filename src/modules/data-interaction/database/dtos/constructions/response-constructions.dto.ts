import { Exclude, Expose } from "class-transformer";
import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class ResponseConstructionsDto extends BaseResponseDto {
    @ApiProperty()
    @Expose()
    type: string;

    @ApiProperty()
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    area: number;

    @ApiProperty()
    @Expose()
    status: string;
}