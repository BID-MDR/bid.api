import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { WorkRequestService } from "./work-request.service";
import { WorkRequestController } from "./work-request.controller";
import { CostEstimateService } from "../cost-estimate/costEstimate.service";
import { CostEstimateModule } from "../cost-estimate/costEstimate.module";
import { NotificationMessageModule } from "../notification-msg/notification-message.module";

@Module({
  imports: [
    DatabaseModule,
    FacadeModule,
    FeatureAuthModule,
    CostEstimateModule,
    NotificationMessageModule,
  ],
  providers: [WorkRequestService],
  controllers: [WorkRequestController],
})
export class WorkRequestModule {}
