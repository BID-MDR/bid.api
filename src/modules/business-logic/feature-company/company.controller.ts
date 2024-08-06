import { Controller, Logger } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompanyService } from "./company.service";

@Controller("company")
@ApiTags("company/Empresa")
export class CompanyController {
  private readonly _logger = new Logger(CompanyController.name);
  constructor(private service: CompanyService) {}
}
