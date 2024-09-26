export declare class AuthenticateResponseDto {
    id: string;
    email: string;
    token: string;
    dateExpirated?: Date;
    constructor(id: string, email: string, token: string, dateExpirated?: Date);
}
