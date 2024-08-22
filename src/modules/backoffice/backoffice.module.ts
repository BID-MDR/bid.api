import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { UserRoleModule } from "./user-roles/user-roles.module";
import { AuthenticateModule } from "./authenticate/authenticate.module";
import { DemandBackofficeModule } from "./demand/demand.module";
import { CompanyBackofficeModule } from "./company/company.module";
import { EmployeeBackofficeModule } from "./employee/employee.module";
import { DashboardBackofficeModule } from "./dashboard/dashboard.module";

@Module({
    imports: [
        UserModule,
        UserRoleModule,
        AuthenticateModule,
        DemandBackofficeModule,
        CompanyBackofficeModule,
        EmployeeBackofficeModule,
        DashboardBackofficeModule
    ],
})
export class BackofficeModule {}