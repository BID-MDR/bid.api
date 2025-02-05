import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateTechnicalVisitDto } from 'src/modules/data-interaction/database/dtos/technical-visit/create-technical-visit.dto';
import { UpdateTechnicalVisitDto } from 'src/modules/data-interaction/database/dtos/technical-visit/update-technical-visit.dto';
import { TechnicalVisitEntity } from 'src/modules/data-interaction/database/entitites/technical-visit.entity';
import { TechnicalVisitRegisterWorkEnum } from 'src/modules/data-interaction/database/enums/technical-visit-register-work-type.enum';
import { RegisterWorkRepository } from 'src/modules/data-interaction/database/repositories/registerWork/registerWork.repository';
import { TechnicalVisitRepository } from 'src/modules/data-interaction/database/repositories/technical-visit.repository';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { WorkRequestRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request.repository';
import { NotificationMessageService } from '../notification-msg/notification-message.service';
import { ConstructionsStatusEnum } from 'src/modules/data-interaction/database/enums/constructions-stauts.enum';
import { TechnicalVisitTypeEnum } from 'src/modules/data-interaction/database/enums/technical-visit-type.enum';
import { RescheduleTechnicalVisitDto } from 'src/modules/data-interaction/database/dtos/technical-visit/reschedule-technical-visit.dto';
import { TechnicalVisitStatusEnum } from 'src/modules/data-interaction/database/enums/technical-visit-status.enum';
import { ContractRepository } from 'src/modules/data-interaction/database/repositories/contract/contract.repository';
import { CreateTechnicalVisitUpdateImprovementProjectDto } from 'src/modules/data-interaction/database/dtos/technical-visit/create-technical-visit-update-improvement-project.dto';
import { ImprovementProjectRepository } from 'src/modules/data-interaction/database/repositories/improvement-project/improvement-project.repository';

@Injectable()
export class FeatureTechnicalVisitService extends BaseService<
    TechnicalVisitEntity,
    CreateTechnicalVisitDto,
    UpdateTechnicalVisitDto
> {
    constructor(
        private technicalVisitRepository: TechnicalVisitRepository,
        private readonly userRepository: UserRepository,
        private workRequestRepository: WorkRequestRepository,
        private registerWorkRepo: RegisterWorkRepository,
        private contractRepository: ContractRepository,
        private notifcationMsgService: NotificationMessageService,
        private improvementProjectRepo: ImprovementProjectRepository
    ) {
        super(technicalVisitRepository);
    }

    async getByProfessional(professionalId: string) {
        const professional = await this.userRepository.findById(professionalId)
        if (!professional) throw new NotFoundException('Professional not found!')

        return await this.technicalVisitRepository.getByProfessional(professionalId);
    }
     
    async getById(id: string) {
        return await this.technicalVisitRepository.getById(id);
    }
    
    async getByProfessionalVisitaTecnicaAgendada(professionalId: string) {
        const professional = await this.userRepository.findById(professionalId)
        if (!professional) throw new NotFoundException('Professional not found!')

        return await this.technicalVisitRepository.getByProfessionalVisitaTecnicaAgendada(professionalId);
    }

    async schedule(userId: string ,dto: CreateTechnicalVisitDto) {

        const userCreate = await this.userRepository.findById(userId)
        dto.userCreate = userCreate;
        const beneficiary = await this.userRepository.getById(dto.beneficiaryId);
        dto.beneficiary = beneficiary;
        const professional = await this.userRepository.getById(dto.professionalId);
        dto.professional = professional;
        const workRequest = await this.workRequestRepository.findById(dto.workRequestId);
        dto.workRequest = workRequest;
        dto.type = TechnicalVisitTypeEnum.CADASTRO_DE_OBRA
        dto.status = !dto.status ? dto.status : TechnicalVisitStatusEnum.AGENDADA
        const technicalVisit = await this.technicalVisitRepository.create(dto)
        this.registerWorkRepo.updateStatus(dto.registerWorkId, ConstructionsStatusEnum.REGISTRATION_SCHEDULE)
    
        return technicalVisit
    }

    async scheduleTechnicalVisitAndUpdateImprovementProject(dto: CreateTechnicalVisitUpdateImprovementProjectDto) {
        const userCreate = await this.userRepository.findById(dto.professionalId)
        if(!userCreate) throw new NotFoundException('User not found!')
        dto.userCreate = userCreate;
        const beneficiary = await this.userRepository.getById(dto.beneficiaryId);
        if(!beneficiary) throw new NotFoundException(' Beneficiary not found!')
        dto.beneficiary = beneficiary;
        const professional = await this.userRepository.getById(dto.professionalId);
        if(!professional) throw new NotFoundException(' Professional not found!')
        dto.professional = professional;
        const workRequest = await this.workRequestRepository.findById2(dto.workRequestId);
        if(!workRequest) throw new NotFoundException(' WorkRequest not found!!!')
        dto.workRequest = workRequest;
        const improvement_project = await this.improvementProjectRepo.findWorkRequest(dto.workRequestId)
        if(!improvement_project) throw new NotFoundException(' Project not found!')
        await this.improvementProjectRepo.updateStatusProjectDelivery(improvement_project.id)
        return await this.technicalVisitRepository.create(dto)
        
    }
    async reScheduleVisit(technicalVisitId: string ,dto: RescheduleTechnicalVisitDto) {
        const technicalVisit = await this.technicalVisitRepository.findById(technicalVisitId)
        if(!technicalVisit) throw new NotFoundException('Technical visit not found!')
        delete dto.registerWorkId
        technicalVisit.from = dto.from
        technicalVisit.to = dto.to
        technicalVisit.duration = dto.duration ? dto.duration : technicalVisit.duration
        technicalVisit.status = TechnicalVisitStatusEnum.AGENDADA
        await technicalVisit.save()
        return await technicalVisit.reload()
    }

    async scheduleRegistertWorkTechnicalVisit(dto: CreateTechnicalVisitDto) {
        const beneficiary = await this.userRepository.getById(dto.beneficiaryId);
        dto.beneficiary = beneficiary;
        const professional = await this.userRepository.getById(dto.professionalId);
        dto.professional = professional;
        const workRequest = await this.workRequestRepository.findById(dto.workRequestId);
        dto.workRequest = workRequest;
        const contract = await this.contractRepository.findById(dto.contractId);
        dto.contract = contract;
        if (dto.beginningOrEnd) {
            if (dto.beginningOrEnd === TechnicalVisitRegisterWorkEnum.BEGINNING) {
                const registerWork = await this.registerWorkRepo.findById(dto.registerWorkBeginningId);
                dto.registerWorkBeginning = registerWork;
            } else {
                const registerWork = await this.registerWorkRepo.findById(dto.registerWorkClosureId);
                dto.reregisterWorkClosure = registerWork;
            }
           
        }
        const techVisit = await this.technicalVisitRepository.create(dto)
        if(dto.msgType && dto.msgType !== '') {
            if(beneficiary) {
                const msg = {
                    content: ''
                }
            if(dto.msgType === 'PROJETO_DE_MELHORIA') {
                msg.content = `${professional.name} solicitou a entrega e assinatura do contrato para o dia ${dto.to}`
                await this.notifcationMsgService.register(beneficiary.id, msg)

            } else if (dto.msgType === 'CADASTRO_DE_OBRA') {
                msg.content = `${professional.name} solicitou o cadastro da obra para o dia ${dto.to}`
                await this.notifcationMsgService.register(beneficiary.id, msg)

            } else if (dto.msgType === 'CONCLUSÃO_DE_OBRA') {
                msg.content = `${professional.name} solicitou a conclusão da obra para o dia${dto.to}`
                await this.notifcationMsgService.register(beneficiary.id, msg)

            }else {
                throw new NotFoundException('To send a msg sucessfuly, property msgType must be  CADASTRO_DE_OBRA , CONCLUSÃO_DE_OBRA or PROJETO_DE_MELHORIA')
            }
            }
        }


        return techVisit
    }

    async findByBeneficiaryId(beneficiaryId: string) {
        return await this.technicalVisitRepository.getByBeneficiary(beneficiaryId);
    }

    // async create(data: CreateTechnicalVisitDto) {
    //     for (const iterator of data.picturesAndVideos) {
    //         const link = await this.storageFacade.uploadMedia(iterator.mimeType, Date.now().toString(), iterator.url);
    //         iterator.url = link;
    //     }
    //     return await super.create(data);
    // }

    // async update(userId: string, data: UpdateTechnicalVisitDto): Promise<TechnicalVisitEntity> {
    //     const workRequest = await this.findByUserId(userId);

    //     if (data.picturesAndVideos) {
    //         for (const iterator of data.picturesAndVideos) {
    //             if (iterator.remove) {
    //                 await this.userGeneratedMediaRepository.hardDelete(iterator.id);
    //                 continue;
    //             }
    //             const link = await this.storageFacade.uploadMedia(
    //                 iterator.mimeType,
    //                 Date.now().toString(),
    //                 iterator.url,
    //             );
    //             iterator.url = link;
    //             const media = await this.userGeneratedMediaRepository.create(iterator as any);
    //             media.workRequest = workRequest;
    //             await media.save();
    //         }
    //     }

    //     if (data.precaritysToBeSolved) {
    //         for (const iterator of data.precaritysToBeSolved) {
    //             if (iterator.remove) {
    //                 await this.workRequestPrecarityRepository.hardDelete(iterator.id);
    //                 continue;
    //             }
    //             const precarity = await this.workRequestPrecarityRepository.create(iterator as any);
    //             precarity.workRequest = workRequest;
    //             await precarity.save();
    //         }
    //     }

    //     if (data.prevalingConstructionMaterials) {
    //         for (const iterator of data.prevalingConstructionMaterials) {
    //             if (iterator.remove) {
    //                 await this.workRequestPrevailingContructionMaterialsRepository.hardDelete(iterator.id);
    //                 continue;
    //             }
    //             const material = await this.workRequestPrevailingContructionMaterialsRepository.create(iterator as any);
    //             material.workRequest = workRequest;
    //             await material.save();
    //         }
    //     }

    //     if (data.roomsAvailableAndQuantity) {
    //         for (const iterator of data.roomsAvailableAndQuantity) {
    //             if (iterator.remove) {
    //                 await this.workRequestRoomTypeQuantityRepository.hardDelete(iterator.id);
    //                 continue;
    //             }
    //             if (iterator.id) {
    //                 await this.workRequestRoomTypeQuantityRepository.update(iterator.id, iterator as any);
    //                 continue;
    //             }
    //             const room = await this.workRequestRoomTypeQuantityRepository.create(iterator as any);
    //             room.workRequest = workRequest;
    //             await room.save();
    //         }
    //     }

    //     if (data.roomsToBeWorked) {
    //         for (const iterator of data.roomsToBeWorked) {
    //             if (iterator.remove) {
    //                 await this.workRequestRoomToWorkRepository.hardDelete(iterator.id);
    //                 continue;
    //             }
    //             const room = await this.workRequestRoomToWorkRepository.create(iterator as any);
    //             room.workRequest = workRequest;
    //             await room.save();
    //         }
    //     }

    //     if (data.welfarePrograms) {
    //         for (const iterator of data.welfarePrograms) {
    //             if (iterator.remove) {
    //                 await this.workRequestWelfareProgramRepository.hardDelete(iterator.id);
    //                 continue;
    //             }
    //             const program = await this.workRequestWelfareProgramRepository.create(iterator as any);
    //             program.workRequest = workRequest;
    //             await program.save();
    //         }
    //     }

    //     if (data.address) {
    //         const address = await this.addressRepository.update(workRequest.address.id, data.address);
    //         address.workRequest = workRequest;
    //         await address.save();
    //     }

    //     delete data.welfarePrograms;
    //     delete data.roomsToBeWorked;
    //     delete data.roomsAvailableAndQuantity;
    //     delete data.precaritysToBeSolved;
    //     delete data.picturesAndVideos;
    //     delete data.prevalingConstructionMaterials;
    //     return await super.update(workRequest.id, data);
    // }
}
