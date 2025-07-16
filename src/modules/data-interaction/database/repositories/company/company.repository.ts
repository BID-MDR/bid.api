import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { CompanyEntity } from "../../entitites/company.entity";
import { addMonths } from "date-fns";

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
  async getCompanyById(id: string) {
    return this.repository.findOne({
        where: { id:  id  },
        relations: ['employees', 'demands', 'userAdmin'],
    });

  }
  async findMonth(month: number) {
    const now = new Date();
    const pastDate = addMonths(now, -month);


    return this.repository.createQueryBuilder('company')
    .where('company.createdAt BETWEEN :pastDate AND :now', {
      pastDate: pastDate.toISOString(),
      now: now.toISOString(),
    })
    .getMany()
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

  async updateUserAdmin(companyId: string, userAdminId: string): Promise<CompanyEntity> {
    await this.repository.createQueryBuilder()
      .update(CompanyEntity)
      .set({ userAdmin: { id: userAdminId } })
      .where("id = :companyId", { companyId })
      .execute();
  
    return this.repository.findOne({
      where: { id: companyId },
      relations: ['userAdmin'],
    });
  }
}
