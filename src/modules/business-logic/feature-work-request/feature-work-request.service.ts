import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateWorkRequestDto } from 'src/modules/data-interaction/database/dtos/work-request/create-work-request.dto';
import { UpdateWorkRequestDto } from 'src/modules/data-interaction/database/dtos/work-request/update-work-request.dto';
import { WorkRequestEntity } from 'src/modules/data-interaction/database/entitites/work-request.entity';
import { AddressRepository } from 'src/modules/data-interaction/database/repositories/address.repository';
import { UserGeneratedMediaRepository } from 'src/modules/data-interaction/database/repositories/user/user-generated-media.repository';
import { WorkRequestPrecarityRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request-precarity.repository';
import { WorkRequestPrevailingContructionMaterialsRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request-prevailing-construction-material.repository';
import { WorkRequestRoomToWorkRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request-room-to-work.repository';
import { WorkRequestRoomTypeQuantityRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request-room-type-quantity.repository';
import { WorkRequestRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request.repository';
import { StorageFacade } from './../../data-interaction/facade/apis/storage/storage.facade';
import { WorkRequestWelfareProgramRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request-welfare-program.repository';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';

@Injectable()
export class FeatureWorkRequestService extends BaseService<
    WorkRequestEntity,
    CreateWorkRequestDto,
    UpdateWorkRequestDto
> {
    constructor(
        private workRequestRepository: WorkRequestRepository,
        private readonly addressRepository: AddressRepository,
        private readonly userGeneratedMediaRepository: UserGeneratedMediaRepository,
        private readonly workRequestPrecarityRepository: WorkRequestPrecarityRepository,
        private readonly workRequestPrevailingContructionMaterialsRepository: WorkRequestPrevailingContructionMaterialsRepository,
        private readonly workRequestRoomToWorkRepository: WorkRequestRoomToWorkRepository,
        private readonly workRequestRoomTypeQuantityRepository: WorkRequestRoomTypeQuantityRepository,
        private readonly workRequestWelfareProgramRepository: WorkRequestWelfareProgramRepository,
        private readonly storageFacade: StorageFacade,
        private readonly userRepository: UserRepository
    ) {
        super(workRequestRepository);
    }

    async findByUserId(userId: string) {
        return await this.workRequestRepository.findByUserId(userId);
    }

   async getByBeneficiaryId(beneficiaryId: string) {
    return await this.workRequestRepository.findByBeneficiaryId(beneficiaryId);
   }

    async findAllNotAtribute(){
        return await this.workRequestRepository.findAll();
    }

    async register(userId: string, data: CreateWorkRequestDto) {
        data.beneficiary = await this.userRepository.getById(userId);
        for (const iterator of data.picturesAndVideos) {
            const link = await this.storageFacade.uploadMedia(iterator.mimeType, Date.now().toString(), iterator.url);
            iterator.url = link;
        }
        return await super.create(data);
    }

    async update(userId: string, data: UpdateWorkRequestDto): Promise<WorkRequestEntity> {
        const workRequest = await this.findByUserId(userId);

        if (data.picturesAndVideos) {
            for (const iterator of data.picturesAndVideos) {
                if (iterator.remove) {
                    await this.userGeneratedMediaRepository.hardDelete(iterator.id);
                    continue;
                }
                const link = await this.storageFacade.uploadMedia(
                    iterator.mimeType,
                    Date.now().toString(),
                    iterator.url,
                );
                iterator.url = link;
                const media = await this.userGeneratedMediaRepository.create(iterator as any);
                media.workRequest = workRequest;
                await media.save();
            }
        }

        if (data.precaritysToBeSolved) {
            for (const iterator of data.precaritysToBeSolved) {
                if (iterator.remove) {
                    await this.workRequestPrecarityRepository.hardDelete(iterator.id);
                    continue;
                }
                const precarity = await this.workRequestPrecarityRepository.create(iterator as any);
                precarity.workRequest = workRequest;
                await precarity.save();
            }
        }

        if (data.prevalingConstructionMaterials) {
            for (const iterator of data.prevalingConstructionMaterials) {
                if (iterator.remove) {
                    await this.workRequestPrevailingContructionMaterialsRepository.hardDelete(iterator.id);
                    continue;
                }
                const material = await this.workRequestPrevailingContructionMaterialsRepository.create(iterator as any);
                material.workRequest = workRequest;
                await material.save();
            }
        }

        if (data.roomsAvailableAndQuantity) {
            for (const iterator of data.roomsAvailableAndQuantity) {
                if (iterator.remove) {
                    await this.workRequestRoomTypeQuantityRepository.hardDelete(iterator.id);
                    continue;
                }
                if (iterator.id) {
                    await this.workRequestRoomTypeQuantityRepository.update(iterator.id, iterator as any);
                    continue;
                }
                const room = await this.workRequestRoomTypeQuantityRepository.create(iterator as any);
                room.workRequest = workRequest;
                await room.save();
            }
        }

        if (data.roomsToBeWorked) {
            for (const iterator of data.roomsToBeWorked) {
                if (iterator.remove) {
                    await this.workRequestRoomToWorkRepository.hardDelete(iterator.id);
                    continue;
                }
                const room = await this.workRequestRoomToWorkRepository.create(iterator as any);
                room.workRequest = workRequest;
                await room.save();
            }
        }

        if (data.welfarePrograms) {
            for (const iterator of data.welfarePrograms) {
                if (iterator.remove) {
                    await this.workRequestWelfareProgramRepository.hardDelete(iterator.id);
                    continue;
                }
                const program = await this.workRequestWelfareProgramRepository.create(iterator as any);
                program.workRequest = workRequest;
                await program.save();
            }
        }

        if (data.address) {
            const address = await this.addressRepository.update(workRequest.address.id, data.address);
            address.workRequest = workRequest;
            await address.save();
        }

        delete data.welfarePrograms;
        delete data.roomsToBeWorked;
        delete data.roomsAvailableAndQuantity;
        delete data.precaritysToBeSolved;
        delete data.picturesAndVideos;
        delete data.prevalingConstructionMaterials;
        return await super.update(workRequest.id, data);
    }

    async updateStatus(work_id: string, professional_id: string){
        return await this.workRequestRepository.updateStatus(work_id,professional_id);
    }
}
