import { Controller, Get, Logger, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DashboardBackofficeService } from "./dashboard.service";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { DemandStatusEnum } from "../../data-interaction/database/enums/demand-status.enum";

@Controller("dashboard-backoffice")
@ApiTags("Dashboard Backoffice")
export class DashboardBackofficeController {
  private readonly _logger = new Logger(DashboardBackofficeController.name);

  constructor(private _service: DashboardBackofficeService) {}

  @Get("demand-by-status")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async demandByStatus(@Query("status") status?: DemandStatusEnum) {
    return await this._service.demandByStatus();
  }
}
