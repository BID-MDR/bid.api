import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { CostEstimateService } from "./costEstimate.service";
import { CostEstimateController } from "./costEstimate.controller";
import { NotificationMessageModule } from "../notification-msg/notification-message.module";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule, NotificationMessageModule],
    providers: [CostEstimateService],
    controllers: [CostEstimateController],
})
export class CostEstimateModule {}
