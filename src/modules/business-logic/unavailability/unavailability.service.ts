import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { UnavailabilityEntity } from "src/modules/data-interaction/database/entitites/unavailability.entity";
import { UnavailabilityCreateDto } from "src/modules/data-interaction/database/dtos/unavailability/create-unavailability.dto";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { UnavailabilityRepository } from "src/modules/data-interaction/database/repositories/unavailability/unavailability.repository";

@Injectable()
export class UnavailabilityService extends BaseService<UnavailabilityEntity, UnavailabilityCreateDto, UnavailabilityCreateDto> {
  constructor(
    private repository: UnavailabilityRepository,
    private userRepo: UserRepository
  ) {
    super(repository);
  }

  async list() {
    const list =  await this.repository.findAll();
    return list
  }

  async listByUser(userId: string) {
    const list =  await this.repository.findByUser(userId);
    return list
  }

  async getById(unavailabilityId: string) {
    return await this.repository.findById(unavailabilityId);
  }


  async register( data: UnavailabilityCreateDto) {
    const user = await this.userRepo.findById(data.userId)
    if (!user) throw new NotFoundException('User not found!')
    data.user = user
    return await this.repository.create(data)
  }


  async update(unavailabilityId: string, data: UnavailabilityCreateDto) {
    const unavailability = this.repository.findById(unavailabilityId);
    if(!unavailability) throw new NotFoundException('Unavailability not found')
    if(data.userId) {
      const user = await this.userRepo.findById(data.userId)
      if (!user) throw new NotFoundException('User not found!')
      data.user = user
      delete data.userId
    }
    return await super.update(unavailabilityId, data);
  }



  async delete(unavailabilityId: string) {
    return await this.repository.hardDelete(unavailabilityId);
  }


}
