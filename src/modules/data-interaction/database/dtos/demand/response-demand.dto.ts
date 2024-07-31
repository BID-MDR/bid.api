import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { UserResponseDto } from "../user/reponse-user.dto";
import { ResponseWorkRequestDto } from "../work-request/response-work-request.dto";
import { TechnicalVisitResponseDto } from "../technical-visit/reponse-technical-visit.dto";
import { DemandEntity } from "../../entitites/demand.entity";
import { ResponseConstructionsDto } from "../constructions/response-constructions.dto";

@Exclude()
export class ResponseDemandDto extends BaseResponseDto {
    @ApiProperty()
    @Expose()
    document: string;

    @ApiProperty()
    @Expose()
    state: string;

    @ApiProperty()
    @Expose()
    city: string;

    @ApiProperty()
    @Expose()
    zipcode: string;

    @ApiProperty()
    @Expose()
    complement: string;

    @ApiProperty()
    @Expose()
    neighborhood: string;

    @ApiProperty()
    @Expose()
    number: string;

    @ApiProperty()
    @Expose()
    street: string;

    @ApiProperty()
    @Expose()
    latitude: string;

    @ApiProperty()
    @Expose()
    longitude: string;

    @ApiProperty()
    @Expose()
    status:string

    @ApiProperty({ type: () => UserResponseDto })
    @Expose()
    @Type(() => UserResponseDto)
    @Transform(({ value }) => value ?? undefined)
    beneficiary: UserResponseDto;

    @ApiProperty({ type: () => UserResponseDto })
    @Expose()
    @Type(() => UserResponseDto)
    @Transform(({ value }) => value ?? undefined)
    professional: UserResponseDto;

    @ApiProperty({ type: () => ResponseWorkRequestDto })
    @Expose()
    @Type(() => ResponseWorkRequestDto)
    @Transform(({ value }) => value ?? undefined)
    workRequest?: ResponseWorkRequestDto;

    @ApiProperty({ type: () => TechnicalVisitResponseDto })
    @Expose()
    @Type(() => TechnicalVisitResponseDto)
    @Transform(({ value }) => value ?? undefined)
    technicalVisit?: TechnicalVisitResponseDto;

    @ApiProperty({ type: () => ResponseConstructionsDto })
    @Expose()
    @Type(() => ResponseConstructionsDto)
    @Transform(({ value }) => value ?? undefined)
    construction?: ResponseConstructionsDto;

    constructor(partial: Partial<DemandEntity>) {
        super();
        Object.assign(this, partial);
    }
}
