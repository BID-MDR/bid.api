import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { TaskService } from "./task.service";


@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule, ],
    providers: [TaskService],
    controllers: [],
})
export class TaskServiceModule {}
