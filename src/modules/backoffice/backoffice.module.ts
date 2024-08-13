import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { UserRoleModule } from "./user-roles/user-roles.module";

@Module({
    imports: [
        UserModule,
        UserRoleModule
    ],
})
export class BackofficeModule {}