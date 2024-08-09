import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { SatisfactionResearchService } from "./satisfaction-research.service";
import { SatisfactionResearchController } from "./satisfaction-research.controller";


@Module({
  imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
  providers: [SatisfactionResearchService],
  controllers: [SatisfactionResearchController],
})
export class SatisfactionResearchModule {}