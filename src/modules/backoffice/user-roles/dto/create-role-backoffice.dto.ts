import { ApiProperty } from "@nestjs/swagger";
import { UserBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-backoffice.entity";

export class CreateUserBackofficeRoleDto {
    @ApiProperty()
    description: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    active: boolean;
}
