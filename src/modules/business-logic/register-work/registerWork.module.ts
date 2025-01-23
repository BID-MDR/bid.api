import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import {  RegisterWorkService } from "./registerWork.service";
import {  RegisterWorkController } from "./registerWork.controller";
import { NotificationMessageModule } from "../notification-msg/notification-message.module";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule, NotificationMessageModule],
    providers: [RegisterWorkService],
    controllers: [RegisterWorkController],
})
export class RegisterWorkModule {}
