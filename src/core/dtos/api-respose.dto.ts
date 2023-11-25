import { ApiProperty } from '@nestjs/swagger';

export class ErrorApiResponseDto {
    @ApiProperty({})
    statusCode: number;
    @ApiProperty({})
    timestamp: string;
    @ApiProperty({})
    path: string;
    @ApiProperty({ nullable: true })
    message?: string;

    constructor(
        statusCode: number,
        timestamp: string,
        path: string,
        message?: string,
    ) {
        this.statusCode = statusCode;
        this.timestamp = timestamp;
        this.path = path;
        this.message = message;
    }
}

export class ApiResponseDto<T> {
    @ApiProperty({ nullable: true })
    totalDocumentCount: number | null = null;

    @ApiProperty({ nullable: true })
    skip: number | null = null;

    @ApiProperty({ nullable: true })
    limit: number | null = null;

    @ApiProperty()
    success = true;

    @ApiProperty({ isArray: true, type: ErrorApiResponseDto, nullable: true })
    errors: ErrorApiResponseDto[] | null = null;

    data: T;

    constructor(
        success: boolean,
        data: T,
        errors: ErrorApiResponseDto[] | null = null,
        totalDocumentCount: number | null = null,
        skip: number | null = null,
        limit: number | null = null,
    ) {
        this.success = success;
        this.errors = errors;
        this.totalDocumentCount = totalDocumentCount;
        this.skip = skip;
        this.limit = limit;
        this.data = data;
    }
}
