import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/core/repositories/base.repository";
import { Repository } from "typeorm";
import { UserBackofficeEntity } from "../../../entitites/user-backoffice.entity";

@Injectable()
export class UserBackofficeRepository extends BaseRepository<UserBackofficeEntity, any, any> {
  constructor(@InjectRepository(UserBackofficeEntity) private repository: Repository<UserBackofficeEntity>) {
    super(repository);
  }

  async getById(_id: string) {
    return await this.repository.findOne({
      where: { id: _id },
      relations: {
        roles: true
      },
    });
  }

}