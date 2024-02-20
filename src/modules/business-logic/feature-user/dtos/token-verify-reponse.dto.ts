import { ApiProperty } from '@nestjs/swagger';

export class TokenVerifyReponseDto {
    @ApiProperty()
    valid: boolean;
}
