import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { UnavailabilityService } from "./unavailability.service";
import { UnavailabilityController } from "./unavailability.controller";


@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [UnavailabilityService],
    controllers: [UnavailabilityController],
})
export class UnavailabilityModule {}
