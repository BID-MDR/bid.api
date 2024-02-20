import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class SigninRequestDto {
    @ApiProperty({
        description: 'Código de autorização do login único govbr.',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        description: 'Código de verificação do login único govbr.',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    codeVerifier: string;
}
