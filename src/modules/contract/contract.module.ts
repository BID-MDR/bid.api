import { Module } from "@nestjs/common";

import { ContractService } from "./contract.service";
import { ContractController } from "./contract.controller";
import { DatabaseModule } from "../data-interaction/database/database.module";
import { FacadeModule } from "../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../business-logic/feature-auth/feature-auth.module";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [ContractService],
    controllers: [ContractController],
})
export class ContractModule {}
