import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsEmail } from "class-validator";
import { UserBackofficeTypeEnum } from "./userTypeEnum";
import { FunctionTypeEnum } from "./functionTypeEnum";
import { UserRolesBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-roles-backoffice.entity";

export class CreateUserBackofficeDto {

    constructor(partial: Partial<CreateUserBackofficeDto>) {
        Object.assign(this, partial);
    }
    
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

    @ApiProperty()
    rolesId: string[];
    roles: UserRolesBackofficeEntity[];

}
