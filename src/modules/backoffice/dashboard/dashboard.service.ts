import { Injectable } from "@nestjs/common";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";
import { DemandStatusEnum } from "../../data-interaction/database/enums/demand-status.enum";

@Injectable()
export class DashboardBackofficeService {
  constructor(
    private readonly demandRepository: DemandRepository
  ) {}

  async demandByStatus(status?: DemandStatusEnum) {
    return await this.demandRepository.listDemandByStatusForDashboard(status);
  }
}
