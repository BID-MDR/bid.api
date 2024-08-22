import { ApiProperty } from '@nestjs/swagger';
import { UserProgramTypeEnum } from 'src/modules/data-interaction/database/enums/user-program-type.enum';

class InfoToRegisterDto {
    @ApiProperty({})
    name: string;
    @ApiProperty({})
    cpf: string;
    @ApiProperty({})
    email: string;
    @ApiProperty({})
    phone: string;

}

export class SigninResponseDto {
    @ApiProperty({
        description: 'Token de autenticação.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        nullable: false,
    })
    accessToken: string;

    @ApiProperty({})
    registered: boolean;

    @ApiProperty({ type: InfoToRegisterDto, nullable: true })
    infoToRegister?: InfoToRegisterDto;

    constructor(accessToken: string, registered: boolean, infoToRegister?: InfoToRegisterDto) {
        this.accessToken = accessToken;
        this.registered = registered;
        this.infoToRegister = infoToRegister;
      
    }
}
