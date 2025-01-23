import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { RegisterWorkEntity } from "src/modules/data-interaction/database/entitites/register-work.entity";
import { RegisterWorkRepository } from "src/modules/data-interaction/database/repositories/registerWork/registerWork.repository";
import { RegisterWorkCreateDto } from "src/modules/data-interaction/database/dtos/register-work/register-work.dto";
import { WorkRequestRepository } from "src/modules/data-interaction/database/repositories/work-request/work-request.repository";
import { BidDocumentRepository } from "src/modules/data-interaction/database/repositories/bidDocument/bidDocument.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { NotificationMessageService } from "../notification-msg/notification-message.service";

@Injectable()
export class RegisterWorkService extends BaseService<RegisterWorkEntity, RegisterWorkCreateDto, RegisterWorkCreateDto> {
  constructor(
    private repository: RegisterWorkRepository,
    private workRequestRepo: WorkRequestRepository,
    private bidDocumentRepo: BidDocumentRepository,
    private userRepo: UserRepository,
    private notiMsgService: NotificationMessageService
  ) {
    super(repository);
  }

  async list() {
    const list =  await this.repository.findAll();
    return list
  }

  async getById(workRequestId: string) {
    return await this.repository.findById(workRequestId);
  }

  async getByProfessional(professionalId: string) {
    const professional = await this.userRepo.findById(professionalId)
    if(!professional) throw new NotFoundException('Professional not found')
    return await this.repository.getByProfessional(professionalId);
  }


  async register(data: RegisterWorkCreateDto) {
    const workRequest = await this.workRequestRepo.findByIdAndBringBeneficiary(data.workRequestId)
    if (!workRequest) throw new NotFoundException('WorkRequest not found!')
      data.workRequest = workRequest
    if(data.bidDocumentId) {
      const bidDocument = await this.bidDocumentRepo.findById(data.bidDocumentId)
      if (!bidDocument) throw new NotFoundException('bidDocument not found!')
      data.bidDocument = bidDocument
    delete data.bidDocumentId
    }
 
    const professional = await this.userRepo.findById(data.professionalId)
    if (!professional) throw new NotFoundException('Professional not found!')
    data.professional = professional
  
    const registerWork =  await this.repository.create(data)
    if(data.regmelOuMinhaCasa && data.regmelOuMinhaCasa !== '') {
      if(!workRequest.beneficiary) throw new NotFoundException('Beneficary not found, notification not sended!')
        const msg = {
        content: ''
      }
        if(data.regmelOuMinhaCasa === 'MINHA_CASA') {
          msg.content = `Confirmação de entrega e assinatura do projeto de melhoria e cronograma físico-financeiro. Siga para a fase de cadastro de obra`
          await this.notiMsgService.register(workRequest.beneficiary.id, msg)
          await this.notiMsgService.register(professional.id, msg)

        } else if (data.regmelOuMinhaCasa === 'REGMEL') {
        msg.content = `Confirmação de entrega e assinatura do projeto de melhoria. Siga para a fase de cadastro de obra`
        await this.notiMsgService.register(workRequest.beneficiary.id, msg)
        await this.notiMsgService.register(professional.id, msg)

      } else {
        throw new NotFoundException('To send a msg sucessfuly, property regmelOuMinhaCasa must be  MINHA_CASA or REGMEL')
      }
    }
    return registerWork
  }

 

  async update(interventionId: string, data: RegisterWorkCreateDto) {
    if (data.workRequestId) {
      const workRequest = await this.workRequestRepo.findById(data.workRequestId)
      if (!workRequest) throw new NotFoundException('Work request not found!')
      data.workRequest = workRequest
      delete data.workRequestId
    }
    if(data.bidDocumentId){
      const bidDocument = await this.bidDocumentRepo.findById(data.bidDocumentId)
      if (!bidDocument) throw new NotFoundException('bidDocument not found!')
        data.bidDocument = bidDocument
      delete data.bidDocument
    }
    if(data.professionalId) {
      const professional = await this.userRepo.findById(data.professionalId)
      if (!professional) throw new NotFoundException('Professional not found!')
      data.professional = professional
      delete data.professionalId
    }
    return await super.update(interventionId, data);
  }

  async startWork(registerWorkId: string ) {
    const registerWork = await this.repository.findById(registerWorkId)
    if(!registerWork) throw new NotFoundException('RegisterWork not found')
    return await this.repository.startRegisterWork(registerWorkId);
  }

  async endRegisterWork(registerWorkId: string ) {
    const registerWork = await this.repository.findById(registerWorkId)
    if(!registerWork) throw new NotFoundException('RegisterWork not found')
    const regWorkToReturn = await this.repository.endRegisterWork(registerWorkId);
    const beneficiario = await this.workRequestRepo.findByIdAndBringBeneficiary(registerWork.workRequest.id)
    if(!beneficiario) throw new NotFoundException('Register work concluded but msg not sended, beneficiary not found!')
    const msg = {
    content: 'Conclusão da obra realizada. Responda a pesquisa de satisfação para ver o relatório de conclusão da obra'
    }
    await this.notiMsgService.register(beneficiario.id, msg)
    if(registerWork.professional) {
      const msgProf = {
        content: 'Conclusão da obra realizada com sucesso'
        }
      await this.notiMsgService.register(registerWork.professional.id, msgProf)

    }

    return regWorkToReturn
  }



  async delete(interventionId: string) {
    return await this.repository.hardDelete(interventionId);
  }


}
