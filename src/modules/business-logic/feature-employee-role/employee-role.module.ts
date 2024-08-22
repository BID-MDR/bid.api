import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { EmployeeRoleService } from "./employee-role.service";
import {  EmployeeRoleController } from "./employee-role.controller";

@Module({
  imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
  providers: [EmployeeRoleService],
  controllers: [EmployeeRoleController],
})
export class EmployeeRoleModule {}