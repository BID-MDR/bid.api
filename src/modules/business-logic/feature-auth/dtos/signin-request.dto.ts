import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class SigninRequestDto {
    @ApiProperty({
        description: 'Código de autorização do login único govbr.',
        example: '1234567890',
    })
    @IsString()
    code?: string;

    @ApiProperty({
        description: 'state usado para controlar a autenticação.',
        example: 'UUID',
    })
    state?: string;
}
