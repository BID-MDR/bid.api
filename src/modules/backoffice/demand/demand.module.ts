import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { DemandBackofficeController } from "./demand.controller";
import { DemandBackofficeService } from "./demand.service";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";
import { FeatureAuthModule } from "src/modules/business-logic/feature-auth/feature-auth.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [DemandBackofficeService],
    controllers: [DemandBackofficeController],
})

export class DemandBackofficeModule {}
