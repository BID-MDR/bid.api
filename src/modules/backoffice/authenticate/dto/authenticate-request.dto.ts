import { ApiProperty } from "@nestjs/swagger";

export class AuthenticateRequestDto {
    
    @ApiProperty({ type: String })
    email?: string;

    @ApiProperty({ type: String })
    password?: string;
}