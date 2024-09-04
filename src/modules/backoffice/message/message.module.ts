import { Module } from "@nestjs/common";
import { FeatureAuthModule } from "src/modules/business-logic/feature-auth/feature-auth.module";
import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";
import { MessageBackofficeService } from "./message.service";
import { MessageBackofficeController } from "./message.controller";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [MessageBackofficeService],
    controllers: [MessageBackofficeController],
})

export class MessageBackofficeModule {}