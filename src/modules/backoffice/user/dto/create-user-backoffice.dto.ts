import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsEmail } from "class-validator";
import { UserBackofficeTypeEnum } from "./userTypeEnum";

export class CreateUserBackofficeDto {
    
    @ApiProperty()
    name: string;

    @ApiProperty({ enum: UserBackofficeTypeEnum })
    @IsEnum(UserBackofficeTypeEnum)
    type: UserBackofficeTypeEnum;

    @ApiProperty({ example: 'test@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty()
    password: string;
}
