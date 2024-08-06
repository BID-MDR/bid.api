import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";

@Module({
  imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}