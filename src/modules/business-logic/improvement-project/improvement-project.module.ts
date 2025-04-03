import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { ImprovementProjectController } from "./improvement-project.controller";
import { ImpromentProjectService } from "./improvement-project.service";
import { NotificationMessageModule } from "../notification-msg/notification-message.module";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule, NotificationMessageModule],
    providers: [ImpromentProjectService],
    controllers: [ImprovementProjectController],
})
export class ImprovementProjectModule {}
