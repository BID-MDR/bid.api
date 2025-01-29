import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { InterventionService } from "./intervention.service";
import { InterventionController } from "./intervention.controller";
import { ContractModule } from "src/modules/contract/contract.module";

@Module({
  imports: [
    DatabaseModule,
    FacadeModule,
    FeatureAuthModule,
    ContractModule,
  ],
  providers: [InterventionService],
  controllers: [InterventionController],
})
export class InterventionModule {}
