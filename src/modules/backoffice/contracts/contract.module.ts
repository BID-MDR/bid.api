import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";
import { FeatureAuthModule } from "src/modules/business-logic/feature-auth/feature-auth.module";
import { Module } from "@nestjs/common";
import { ContractService } from "./contract.service";
import { ContractdBackofficeController } from "./contract.controller";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [ContractService],
    controllers: [ContractdBackofficeController],
})

export class ContractBackofficeModule {}
