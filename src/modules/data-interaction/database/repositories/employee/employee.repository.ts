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

  async getById(_id: string) {
    return await this.repository
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.user", "user")
      .leftJoinAndSelect("employee.company", "company")
      .where("employee.id = :id", { id: _id })
      .getOne();
  }

  async listByCompany(companyId: string): Promise<EmployeeEntity[]> {
    return await this.repository
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.company", "company")
      .where("company.id = :companyId", { companyId })
      .getMany();
  }
}
