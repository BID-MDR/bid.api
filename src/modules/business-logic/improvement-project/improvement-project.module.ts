import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { ImprovementProjectController } from "./improvement-project.controller";
import { ImpromentProjectService } from "./improvement-project.service";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [ImpromentProjectService],
    controllers: [ImprovementProjectController],
})
export class ImprovementProjectModule {}
