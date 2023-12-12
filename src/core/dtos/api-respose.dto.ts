import { ApiProperty } from '@nestjs/swagger';
import { ErrorApiResponseInterface } from '../interfaces/error-api-response.interface';

export class ErrorApiResponseDto implements ErrorApiResponseInterface {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    message: string;
    @ApiProperty()
    code: string;
    @ApiProperty()
    timestamp: string;
    @ApiProperty()
    path: string;
    @ApiProperty()
    method: string;

    constructor(statusCode: number, message: string, code: string, timestamp: string, path: string, method: string) {
        this.statusCode = statusCode;
        this.message = message;
        this.code = code;
        this.timestamp = timestamp;
        this.path = path;
        this.method = method;
    }
}

export class ApiResponseDto<T> {
    @ApiProperty({ nullable: true })
    totalDocumentCount: number | null = null;

    @ApiProperty({ nullable: true })
    skip: number | null = null;

    @ApiProperty({ nullable: true })
    limit: number | null = null;

    @ApiProperty({ type: Boolean })
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
