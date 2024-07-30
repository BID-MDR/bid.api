import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { RoomResponseDto } from "../room/reponse-room.dto";

@Exclude()
class ResponseWelfare{
    @ApiProperty()
    @Expose()
    @Type(() => String)
    welfareProgram: string;
}

@Exclude()
export class ResponseWorkRequestDto extends BaseResponseDto {
    @ApiProperty()
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    resident: number;

    @ApiProperty()
    @Expose()
    @Type(() => String)
    kinship: string;

    @ApiProperty()
    @Expose()
    @Type(() => String)
    propertyType: string;

    @ApiProperty()
    @Expose()
    @Type(() => String)
    flooring: string;

    @ApiProperty()
    @Expose()
    @Type(() => String)
    prevailingConstructionMaterials: string;

    @ApiProperty({ type: RoomResponseDto, isArray: true })
    @Type(() => RoomResponseDto)
    @Expose()
    room: RoomResponseDto[];

    @ApiProperty({ type: ResponseWelfare, isArray: true })
    @Type(() => ResponseWelfare)
    @Expose()
    welfare: ResponseWelfare[];
}
