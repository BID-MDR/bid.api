import { Module } from "@nestjs/common";
import { FeatureAuthModule } from "src/modules/business-logic/feature-auth/feature-auth.module";
import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";
import { HelpBackofficeService } from "./help.service";
import { HelpBackofficeController } from "./help.controller";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [HelpBackofficeService],
    controllers: [HelpBackofficeController],
})

export class HelpBackofficeModule {}