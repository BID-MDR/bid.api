declare class InfoToRegisterDto {
    name: string;
    cpf: string;
    email: string;
    phone: string;
}
export declare class SigninResponseDto {
    accessToken: string;
    registered: boolean;
    infoToRegister?: InfoToRegisterDto;
    constructor(accessToken: string, registered: boolean, infoToRegister?: InfoToRegisterDto);
}
export {};
