import { Module } from "@nestjs/common";
import { ContractService } from "./contract.service";
import { ContractController } from "./contract.controller";
import { DatabaseModule } from "../data-interaction/database/database.module";
import { FacadeModule } from "../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../business-logic/feature-auth/feature-auth.module";
import { NotificationMessageModule } from "../business-logic/notification-msg/notification-message.module";

@Module({
  imports: [
    DatabaseModule,
    FacadeModule,
    FeatureAuthModule,
    NotificationMessageModule,
  ],
  providers: [ContractService],
  controllers: [ContractController],
  exports: [ContractService],
})
export class ContractModule {}
