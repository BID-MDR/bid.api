import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { EmployeeService } from "./employee.service";
import { EmployeeController } from "./employee.controller";

@Module({
  imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}