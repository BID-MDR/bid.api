import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { SatisfactionResearchRepository } from "src/modules/data-interaction/database/repositories/satisfaction-research/satisfaction-research.repository";
import { SatisfactionResearchEntity } from "src/modules/data-interaction/database/entitites/satisfaction-research.entity";
import { WorkRequestRepository } from "src/modules/data-interaction/database/repositories/work-request/work-request.repository";
import { CreateSatisfactionResearchDto } from "src/modules/data-interaction/database/dtos/satisfaction-research/create-satisfaction-research.dto";

@Injectable()
export class SatisfactionResearchService extends BaseService<SatisfactionResearchEntity, any, any> {
  constructor(
    private workRequestRepository: WorkRequestRepository,
    private satisfactionResearchRepository: SatisfactionResearchRepository,
    private userRepository: UserRepository
  ) {
    super(satisfactionResearchRepository);
  }

  async register(data: CreateSatisfactionResearchDto, userId: string, workRequestId: string): Promise<SatisfactionResearchEntity> {
    const user = await this.userRepository.getById(userId);
    if (!user) throw new BadRequestException("Usuário não encontrado(a).");
    const workRequest = await this.workRequestRepository.findById(workRequestId)
    if (!workRequest) throw new BadRequestException("Obra não encontrada.");
    data.user = user;
    data.workRequest = workRequest;

    return await this.satisfactionResearchRepository.create(data);
  }

  async list(): Promise<SatisfactionResearchEntity[]> {
    return await this.satisfactionResearchRepository.findAll();
  }
  async hardDelete(id: string): Promise<void> {
    return await this.satisfactionResearchRepository.hardDelete(id);
  }
}
