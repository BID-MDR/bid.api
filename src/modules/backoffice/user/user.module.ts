import { Module } from "@nestjs/common";
import { FeatureAuthModule } from "src/modules/business-logic/feature-auth/feature-auth.module";
import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";
import { UserService } from "./user.service";
import { UserBackofficeController } from "./user.controller";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [UserService],
    controllers: [UserBackofficeController],
})
export class UserModule {}
