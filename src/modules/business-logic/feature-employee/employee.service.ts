import { Injectable } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { EmployeeEntity } from "../../data-interaction/database/entitites/employee.entity";
import { EmployeeRepository } from "../../data-interaction/database/repositories/employee/employee.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";

@Injectable()
export class EmployeeService extends BaseService<EmployeeEntity, any, any> {
  constructor(
    private employeeRepository: EmployeeRepository,
    private demandRepository: DemandRepository
  ) {
    super(employeeRepository);
  }
}
