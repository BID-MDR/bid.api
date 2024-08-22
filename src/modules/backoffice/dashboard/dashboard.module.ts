import { Module } from "@nestjs/common";
import { FeatureAuthModule } from "../../business-logic/feature-auth/feature-auth.module";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { DashboardBackofficeService } from "./dashboard.service";
import { DashboardBackofficeController } from "./dashboard.controller";

@Module({
  imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
  providers: [DashboardBackofficeService],
  controllers: [DashboardBackofficeController],
})
export class DashboardBackofficeModule {}