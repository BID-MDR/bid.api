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
    @ApiProperty({ type: Boolean })
    success: boolean;

    @ApiProperty({ isArray: true, type: ErrorApiResponseDto, nullable: true })
    errors: ErrorApiResponseDto[] | null = null;

    data: T;

    constructor(
        success: boolean = true,
        data: T,
        errors: ErrorApiResponseDto[] | null = null,
    ) {
        this.success = success;
        this.errors = errors;
        this.data = data;
    }
}
