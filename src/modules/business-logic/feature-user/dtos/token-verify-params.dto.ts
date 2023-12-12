import { IsNumberString, Length } from 'class-validator';

export class TokenVerifyParamsDto {
    @Length(6, 6)
    @IsNumberString()
    token: string;
}
