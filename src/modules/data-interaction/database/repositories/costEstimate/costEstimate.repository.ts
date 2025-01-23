import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";
import { CostEstimateEntity } from "../../entitites/cost-estimate.entity";
import { CreateCostEstimateRequestDto } from "../../dtos/cost-estimate/cost-estimate-request.dto";
import { CostEstimateStatusEnum } from "../../enums/cost-estimate-status.enum";
import { CostEstimateAproveReproveRequestDto } from "../../dtos/cost-estimate/cost-estimate-aprove-reprove-request.dto";

@Injectable()
export class CostEstimateRepository extends BaseRepository<
  CostEstimateEntity,
  CreateCostEstimateRequestDto,
  CreateCostEstimateRequestDto
> {
  constructor(
    @InjectRepository(CostEstimateEntity)
    private repository: Repository<CostEstimateEntity>,
  ) {
    super(repository);
  }

  async requestAdjust(costEstimateId: string, adjustDetail: string) {
    return await this.repository.update({ id: costEstimateId }, {adjustDetails: adjustDetail, type: CostEstimateStatusEnum.CHANGE_SOLICITATION});
  }

  async findById(costEstimateId: string): Promise<CostEstimateEntity> {
    return await this.repository.findOne({
      where: { id: costEstimateId },
      relations: ['professional', 'rooms', 'workRequest', 'workRequest.room', 'workRequest.room.roomSolutions', 'workRequest.beneficiary', 'workRequest.beneficiary.address'],
    });
  }

  async getById(costEstimateId: string): Promise<CostEstimateEntity> {
    return await this.repository.findOne({
      where: { id: costEstimateId },
      relations: ['rooms'],
    });
  }
  async find(): Promise<CostEstimateEntity[]> {
    return await this.repository.find({
      relations: ['rooms', 'workRequest', 'workRequest.room', 'workRequest.room.roomSolutions'],
    });
  }

  async findByProfessional(professionalId: any): Promise<CostEstimateEntity[]> {
    return await this.repository
    .createQueryBuilder('costEstimate')
    .leftJoinAndSelect('costEstimate.professional', 'professional')
    .leftJoinAndSelect('costEstimate.rooms', 'rooms')
    .leftJoinAndSelect('costEstimate.workRequest', 'workRequest')
    .leftJoinAndSelect('workRequest.beneficiary', 'beneficiary')
    .leftJoinAndSelect('beneficiary.address', 'address')
    .leftJoinAndSelect('workRequest.room', 'room')
    .leftJoinAndSelect('room.roomSolutions', 'roomSolutions')
    .where('costEstimate.professional = :professionalId', { professionalId })
    .getMany();
  }

  async findByBeneficary(beneficiaryId: any): Promise<CostEstimateEntity[]> {
    return await this.repository
    .createQueryBuilder('costEstimate')
    .leftJoinAndSelect('costEstimate.professional', 'professional')
    .leftJoinAndSelect('costEstimate.rooms', 'rooms')
    .leftJoinAndSelect('costEstimate.workRequest', 'workRequest')
    .leftJoinAndSelect('workRequest.beneficiary', 'beneficiary')
    .leftJoinAndSelect('beneficiary.address', 'address')
    .leftJoinAndSelect('workRequest.room', 'room')
    .leftJoinAndSelect('room.roomSolutions', 'roomSolutions')
    .where('workRequest.beneficiary = :beneficiaryId', { beneficiaryId })
    .getMany();
  }

      async getByProfessionalAndStatus(professionalId: string) {
        return this.repository.find({
          where: {
            professional: { id: professionalId },
            type: Not(In(['REPROVED_ESTIMATION', 'APPROVED_ESTIMATION'])),
          },
          relations: ['professional', 'workRequest'],
        });
      }   

  async updateStatus(costEstimateId: string, status: CostEstimateAproveReproveRequestDto) {
    return await this.repository.update({ id: costEstimateId }, { type: status.type});
  }


}