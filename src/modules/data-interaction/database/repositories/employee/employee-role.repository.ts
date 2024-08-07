import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { EmployeeRoleEntity } from "../../entitites/employee-role.entity";
import { CreateEmployeeRoleDto } from "../../dtos/employee-role/employee-role-create.dto";

@Injectable()
export class EmployeeRoleRepository extends BaseRepository<EmployeeRoleEntity, CreateEmployeeRoleDto, CreateEmployeeRoleDto> {
  constructor(@InjectRepository(EmployeeRoleEntity) private repository: Repository<EmployeeRoleEntity>) {
    super(repository);
  }
}