import { Module } from "@nestjs/common";
import { FeatureAuthModule } from "src/modules/business-logic/feature-auth/feature-auth.module";
import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";
import { EmployeeRoleBackofficeController } from "./employee-role.controller";
import { EmployeeRoleBackofficeService } from "./employee-role.service";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [EmployeeRoleBackofficeService],
    controllers: [EmployeeRoleBackofficeController],
})

export class EmployeeRoleBackofficeModule {}