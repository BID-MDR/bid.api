export declare class ResponseDto<T> {
    success: boolean;
    data: T;
    errors: any;
    constructor(success: boolean, data: T, errors: any);
}
