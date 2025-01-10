import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsEmail, IsOptional } from "class-validator";
import { UserBackofficeTypeEnum } from "./userTypeEnum";
import { FunctionTypeEnum } from "./functionTypeEnum";
import { UserRolesBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-roles-backoffice.entity";
import { UserStatusEnum } from "./userStatusEnum";
import { UserProgramTypeEnum } from "src/modules/data-interaction/database/enums/user-program-type.enum";

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

    @ApiProperty({default: new Date()})
    lastAccess: Date;

    @ApiProperty()
    @IsOptional()
    timeView?: number;

    @ApiProperty({ enum: UserStatusEnum })
    @IsEnum(UserStatusEnum)
    status: UserStatusEnum;

    @ApiProperty({ enum: UserProgramTypeEnum })
    @IsEnum(UserProgramTypeEnum)
    programType: UserProgramTypeEnum;

    @ApiProperty()
    rolesId: string[];
    roles: UserRolesBackofficeEntity[];

}
