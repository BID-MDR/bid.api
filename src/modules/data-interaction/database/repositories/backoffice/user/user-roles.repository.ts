import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/core/repositories/base.repository";
import { Repository } from "typeorm";
import { UserRolesBackofficeEntity } from "../../../entitites/user-roles-backoffice.entity";

@Injectable()
export class UserRolesBackofficeRepository extends BaseRepository<UserRolesBackofficeEntity, any, any> {
  constructor(@InjectRepository(UserRolesBackofficeEntity) private repository: Repository<UserRolesBackofficeEntity>) {
    super(repository);
  }

  async findByName( name: string){
    return await this.repository.findOne({ where: { role: name}});
  }
}