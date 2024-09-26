import { ErrorApiResponseInterface } from '../interfaces/error-api-response.interface';
export declare class ErrorApiResponseDto implements ErrorApiResponseInterface {
    statusCode: number;
    message: string;
    code: string;
    timestamp: string;
    path: string;
    method: string;
    constructor(statusCode: number, message: string, code: string, timestamp: string, path: string, method: string);
}
export declare class ApiResponseDto<T> {
    success: boolean;
    errors: ErrorApiResponseDto[] | null;
    data: T;
    constructor(success: boolean, data: T, errors?: ErrorApiResponseDto[] | null);
}
