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
    return await this.repository.findOne({
      where: { id: _id },
      relations: {
        user: true,
        company: true,
        roles: true,
      },
    });
  }

  async listAll() {
    return await this.repository.find({
      relations: {
        user: true,
        company: true,
        roles: true,
      },
    });
  }

  async listByCompany(companyId: string): Promise<EmployeeEntity[]> {
    return await this.repository.find({
      where: { company: { id: companyId } },
      relations: ["company", "user"],
    });
  }
}
