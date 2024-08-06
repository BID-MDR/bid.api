import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { EmployeeEntity } from "../../entitites/employee.entity";

@Injectable()
export class EmployeeRepository extends BaseRepository<EmployeeEntity, any, any> {
  constructor(@InjectRepository(EmployeeEntity) private repository: Repository<EmployeeEntity>) {
    super(repository);
  }
}