import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { CompanyBackofficeController } from "./company.controller";
import { CompanyBackofficeService } from "./company.service";
import { Module } from "@nestjs/common";
import { FeatureAuthModule } from "src/modules/business-logic/feature-auth/feature-auth.module";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [CompanyBackofficeService],
    controllers: [CompanyBackofficeController],
})

export class CompanyBackofficeModule {}
