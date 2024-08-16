import { Module } from "@nestjs/common";
import { EmployeeBackofficeController } from "./employee.controller";
import { EmployeeBackofficeService } from "./employee.service";
import { FeatureAuthModule } from "src/modules/business-logic/feature-auth/feature-auth.module";
import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [EmployeeBackofficeService],
    controllers: [EmployeeBackofficeController],
})

export class EmployeeBackofficeModule {}
