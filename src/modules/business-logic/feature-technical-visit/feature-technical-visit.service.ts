import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateTechnicalVisitDto } from 'src/modules/data-interaction/database/dtos/technical-visit/create-technical-visit.dto';
import { UpdateTechnicalVisitDto } from 'src/modules/data-interaction/database/dtos/technical-visit/update-technical-visit.dto';
import { TechnicalVisitEntity } from 'src/modules/data-interaction/database/entitites/technical-visit.entity';
import { TechnicalVisitRegisterWorkEnum } from 'src/modules/data-interaction/database/enums/technical-visit-register-work-type.enum';
import { RegisterWorkRepository } from 'src/modules/data-interaction/database/repositories/registerWork/registerWork.repository';
import { TechnicalVisitRepository } from 'src/modules/data-interaction/database/repositories/technical-visit.repository';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { WorkRequestRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request.repository';

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
        private registerWorkRepo: RegisterWorkRepository
    ) {
        super(technicalVisitRepository);
    }

    async getByProfessional(professionalId: string) {
        return await this.technicalVisitRepository.getByProfessional(professionalId);
    }

    async schedule(dto: CreateTechnicalVisitDto) {
        const beneficiary = await this.userRepository.getById(dto.beneficiaryId);
        dto.beneficiary = beneficiary;
        const professional = await this.userRepository.getById(dto.professionalId);
        dto.professional = professional;
        const workRequest = await this.workRequestRepository.findById(dto.workRequestId);
        dto.workRequest = workRequest;

        return await this.technicalVisitRepository.create(dto)
    }

    async scheduleRegistertWorkTechnicalVisit(dto: CreateTechnicalVisitDto) {
        const beneficiary = await this.userRepository.getById(dto.beneficiaryId);
        dto.beneficiary = beneficiary;
        const professional = await this.userRepository.getById(dto.professionalId);
        dto.professional = professional;
        if (dto.beginningOrEnd) {
            if (dto.beginningOrEnd === TechnicalVisitRegisterWorkEnum.BEGINNING) {
                const registerWork = await this.registerWorkRepo.findById(dto.registerWorkBeginningId);
                dto.registerWorkBeginning = registerWork;
            } else {
                const registerWork = await this.registerWorkRepo.findById(dto.registerWorkClosureId);
                dto.reregisterWorkClosure = registerWork;
            }
           
        }
    

        return await this.technicalVisitRepository.create(dto)
    }

    // async findByUserId(userId: string) {
    //     return await this.workRequestRepository.findByUserId(userId);
    // }

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
