import { ApiProperty } from "@nestjs/swagger";
import { UserBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-backoffice.entity";
import { FunctionTypeEnum } from "../../user/dto/functionTypeEnum";

export class CreateUserBackofficeRoleDto {
    @ApiProperty()
    description: string;

    @ApiProperty({enum: FunctionTypeEnum})
    role: FunctionTypeEnum;

    @ApiProperty()
    active: boolean;
}
