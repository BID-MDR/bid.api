import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";
import { RegisterWorkEntity } from "../../entitites/register-work.entity";
import { RegisterWorkCreateDto } from "../../dtos/register-work/register-work.dto";
import { RegisterWorkStatusEnum } from "../../enums/register-work.enum";
import { ConstructionsStatusEnum } from "../../enums/constructions-stauts.enum";
import { ConstructionsTypeEnum } from "../../enums/constructions-type.status";

@Injectable()
export class RegisterWorkRepository extends BaseRepository<
  RegisterWorkEntity,
  RegisterWorkCreateDto,
  RegisterWorkCreateDto
> {
  constructor(
    @InjectRepository(RegisterWorkEntity)
    private repository: Repository<RegisterWorkEntity>,
  ) {
    super(repository);
  }

  async findById(costEstimateId: string): Promise<RegisterWorkEntity> {
    return await this.repository.findOne({
      where: { id: costEstimateId },
     relations: [ 'professional', 'workRequest.contractResignedList', 'workRequest.beneficiary', 'workRequest.room', 'workRequest.contracts'],
    });
  }
  async getByWorkRequestId(workRequestId: string): Promise<RegisterWorkEntity> {
    return this.repository.findOne({
      where: { workRequest: { id: workRequestId } },
    });
  }
  async find(): Promise<RegisterWorkEntity[]> {
    return await this.repository.find({
      //relations: ['workRequest', 'workRequest.room'],
    });
  }
  async getByProfessionalAndStatus(professionalId: string) {
    return this.repository.find({
      where: {
        professional: { id: professionalId },
        status: Not(In(['FINALIZADA'])),
      },
      relations: ['professional', 'workRequest', 'workRequest.beneficiary', 'workRequest.contractResignedList'],
    });
  } 
  
  async getByProfessional(professionalId: string){
    return this.repository
      .createQueryBuilder('registerWork')
      .leftJoinAndSelect('registerWork.workRequest', 'workRequest')
      .leftJoinAndSelect('workRequest.beneficiary', 'beneficiary')
      .leftJoinAndSelect('workRequest.contractResignedList', 'contractResignedList')
      .leftJoinAndSelect('workRequest.demand', 'demand')
      .leftJoinAndSelect('workRequest.contracts', 'contract')
      .leftJoinAndSelect('beneficiary.address', 'address')
      .leftJoinAndSelect('workRequest.technicalVisit', 'technicalVisit')
      .where('registerWork.professionalId = :professionalId', { professionalId })
      .getMany();
  }
  async getByBeneficary(beneficaryId: string) {
  
    return this.repository
      .createQueryBuilder('registerWork')
      .leftJoinAndSelect('registerWork.workRequest', 'workRequest')
      .leftJoinAndSelect('registerWork.professional', 'professional')
      .leftJoinAndSelect('workRequest.demand', 'demand')
      .leftJoinAndSelect('workRequest.technicalVisit', 'technicalVisit')
      .leftJoinAndSelect('workRequest.contracts', 'contract')
      .leftJoinAndSelect('workRequest.contractResignedList', 'contractResignedList')
      .leftJoinAndSelect('workRequest.beneficiary', 'beneficiary') 
      .where('beneficiary.id = :beneficaryId', { beneficaryId }) 
      .getMany();
  }
  
  async startRegisterWork(registerWorkId: string, ) {
    return await this.repository.update({ id: registerWorkId }, {startedDate: new Date(), status: ConstructionsStatusEnum.EM_ANDAMENTO});
  }
  async finishRegisterWork(registerWorkId: string, description: string) {
    return await this.repository.update({ id: registerWorkId }, { status: ConstructionsStatusEnum.CONCLUDED, description: description});
  }
  async updateStatus(registerWorkId: string, statusUpdate:ConstructionsStatusEnum ) {
    return await this.repository.update({ id: registerWorkId }, { status: statusUpdate});
  }
  async updateTypeAreaDesc(registerWorkId: string, typeItem:ConstructionsTypeEnum, area: number, descr: string) {
    return await this.repository.update({ id: registerWorkId }, { type: typeItem, area: area, description: descr, status:ConstructionsStatusEnum.TO_SCHEDULE_CONCLUSION, startedDate: new Date()});
  }

async concludedRegisterWork(registerWorkId: string): Promise<RegisterWorkEntity> {
  const reg = await this.repository.findOne({ where: { id: registerWorkId } });


  reg.concludedDate = new Date();
  reg.status = ConstructionsStatusEnum.CONCLUDED;

  return this.repository.save(reg);
}
  async endRegisterWork(registerWorkId: string, ) {
    return await this.repository.update({ id: registerWorkId }, {concludedDate: new Date(), status: ConstructionsStatusEnum.CONCLUDED});
  }

}