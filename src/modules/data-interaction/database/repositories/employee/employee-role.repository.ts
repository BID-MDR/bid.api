import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { EmployeeRoleEntity } from "../../entitites/employee-role.entity";

@Injectable()
export class EmployeeRoleRepository extends BaseRepository<EmployeeRoleEntity, any, any> {
  constructor(@InjectRepository(EmployeeRoleEntity) private repository: Repository<EmployeeRoleEntity>) {
    super(repository);
  }
}