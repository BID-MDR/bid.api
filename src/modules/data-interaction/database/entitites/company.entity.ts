import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AddressEntity } from "./address.entity";
import { EmployeeEntity } from "./employee.entity";
import { UserEntity } from "./user.entity";
import { CompanyStatusEnum } from "../enums/company-status.enum";

@Entity({ name: "company" })
export class CompanyEntity extends BaseEntity {
  @Column({
    type: "text",
    length: 100,
  })
  name: string;

  @Column({
    type: "text",
  })
  cnpj: string;

  @Column({
    type:"enum",
    enum:CompanyStatusEnum,
    default:CompanyStatusEnum.PENDING
  })
  status: CompanyStatusEnum;

  @OneToOne(() => AddressEntity, address => address.company, { eager: true, cascade: true })
  addresses: AddressEntity;

  @OneToOne(() => UserEntity, user => user.companyAdministrator, { eager: true })
  @JoinColumn()
  userAdmin: UserEntity;

  @OneToMany(() => EmployeeEntity, employee => employee.company, { eager: true, cascade: true })
  employees: EmployeeEntity[];
}
