import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { CostEstimateService } from "./costEstimate.service";
import { CostEstimateController } from "./costEstimate.controller";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [CostEstimateService],
    controllers: [CostEstimateController],
})
export class CostEstimateModule {}
