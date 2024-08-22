import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { CompanyEntity } from "../../entitites/company.entity";

@Injectable()
export class CompanyRepository extends BaseRepository<CompanyEntity, any, any> {
  constructor(@InjectRepository(CompanyEntity) private repository: Repository<CompanyEntity>) {
    super(repository);
  }
  async getByOwner(ownerId: string) {
    return this.repository.find({
        where: { userAdmin: { id: ownerId } },
        relations: ['employees', 'demands', 'userAdmin'],
    });

  }

  async getByEmployee(userId: string){
    return  this.repository.createQueryBuilder("company")
    .leftJoinAndSelect("company.employees", "employees")
    .leftJoinAndSelect("employees.user", "user")
    .where("user.id = :userId", { userId })
    .getOne();
  }


  async find(){
    return  await  this.repository.createQueryBuilder("company")
    .leftJoinAndSelect("company.employees", "employees")
    .leftJoinAndSelect("employees.user", "user")
    .getMany();
    
  }
}
