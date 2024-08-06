import { Controller, Logger } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EmployeeService } from "./employee.service";

@Controller("employee")
@ApiTags("employee/Funcionario")
export class EmployeeController {
    private readonly _logger = new Logger(EmployeeController.name);
    constructor(private service: EmployeeService) {}
}