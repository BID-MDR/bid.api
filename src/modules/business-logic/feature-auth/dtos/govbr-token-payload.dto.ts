import { Equals, IsBase64, IsNotEmpty } from "class-validator";

export class GovbrTokenPayloadDto {
    @IsBase64()
    @IsNotEmpty()
    access_token: string;

    @IsBase64()
    @IsNotEmpty()
    id_token: string;

    @Equals('Bearer')
    token_type: string;

    @IsNotEmpty()
    expires_in: string;
}
