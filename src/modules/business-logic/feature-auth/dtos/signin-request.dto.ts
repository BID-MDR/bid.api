import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class SigninRequestDto {
    @ApiProperty({
        description: 'Código de autorização do login único govbr.',
        example: '1234567890',
    })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        description: 'state usado para controlar a autenticação.',
        example: 'UUID',
    })
    @IsUUID()
    @IsNotEmpty()
    state: string;
}
