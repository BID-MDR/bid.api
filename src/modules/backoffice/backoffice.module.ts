import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { UserRoleModule } from "./user-roles/user-roles.module";
import { AuthenticateModule } from "./authenticate/authenticate.module";

@Module({
    imports: [
        UserModule,
        UserRoleModule,
        AuthenticateModule
    ],
})
export class BackofficeModule {}