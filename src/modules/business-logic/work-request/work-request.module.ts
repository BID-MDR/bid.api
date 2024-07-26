import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { WorkRequestService } from "./work-request.service";
import { WorkRequestController } from "./work-request.controller";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [WorkRequestService],
    controllers: [WorkRequestController],
})
export class WorkRequestModule {}
