import { Module } from "@nestjs/common";
import { FeatureAuthModule } from "src/modules/business-logic/feature-auth/feature-auth.module";
import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";
import { SatisfactionResearchBackofficeService } from "./satisfaction-research.service";
import { SatisfactionResearchBackofficeController } from "./satisfaction-research.controller";


@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [SatisfactionResearchBackofficeService],
    controllers: [SatisfactionResearchBackofficeController],
})

export class SatisfactionResearchBackofficeModule {}