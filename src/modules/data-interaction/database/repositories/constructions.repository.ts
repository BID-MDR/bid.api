import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../core/repositories/base.repository";
import { ConstructionsEntity } from "../entitites/constructions.entity";

@Injectable()
export class ConstructionsRepository extends BaseRepository<ConstructionsEntity, any, any> {
  constructor(@InjectRepository(ConstructionsEntity) private repository: Repository<ConstructionsEntity>) {
    super(repository);
  }
}
