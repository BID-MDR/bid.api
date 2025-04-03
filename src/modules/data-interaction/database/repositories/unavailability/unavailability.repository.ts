import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/core/repositories/base.repository";
import { LessThan, Repository } from "typeorm";
import { UnavailabilityEntity } from "../../entitites/unavailability.entity";
import { UnavailabilityCreateDto } from "../../dtos/unavailability/create-unavailability.dto";

@Injectable()
export class UnavailabilityRepository extends BaseRepository<UnavailabilityEntity, UnavailabilityCreateDto, UnavailabilityCreateDto> {
  constructor(@InjectRepository(UnavailabilityEntity) private repository: Repository<UnavailabilityEntity>) {
    super(repository);
  }

  async findByUser(userId: string): Promise<UnavailabilityEntity[]> {
    return this.repository
      .createQueryBuilder('unavailability')
      .leftJoinAndSelect('unavailability.user', 'user') 
      .where('user.id = :userId', { userId })
      .getMany(); 
  }

  async findOlderThanAWeek(): Promise<UnavailabilityEntity[]> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.repository.find({
      where: { finishDate: LessThan(oneWeekAgo) },
    });
  }

}
