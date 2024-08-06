import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AddressEntity } from "./address.entity";
import { EmployeeEntity } from "./employee.entity";
import { UserEntity } from "./user.entity";
import { CompanyStatusEnum } from "../enums/company-status.enum";
import { DemandEntity } from "./demand.entity";

@Entity({ name: "company" })
export class CompanyEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 100,
  })
  name: string;

  @Column({
    type: "varchar",
  })
  cnpj: string;

  @Column({
    type:"enum",
    enum:CompanyStatusEnum,
    default:CompanyStatusEnum.PENDING
  })
  status: CompanyStatusEnum;

  @OneToMany(() => AddressEntity, address => address.company, { eager: true, cascade: true }) // Ajuste aqui
  addresses: AddressEntity[];
  
  @OneToOne(() => UserEntity, user => user.companyAdministrator, { eager: true })
  @JoinColumn()
  userAdmin: UserEntity;

  @OneToMany(() => EmployeeEntity, employee => employee.company, { eager: true, cascade: true })
  employees: EmployeeEntity[];

  @OneToMany(()=> DemandEntity, demand => demand.company)
  demands: DemandEntity[];
}
