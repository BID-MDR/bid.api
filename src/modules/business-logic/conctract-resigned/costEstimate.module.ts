import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { ContractResignedService } from "./contractResigned.service";
import { ContractResignedController } from "./contractResigned.controller";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [ContractResignedService],
    controllers: [ContractResignedController],
})
export class ContractResignedModule {}
