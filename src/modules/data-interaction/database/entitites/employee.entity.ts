import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../../../core/entities/base.entity";
import { EmployeeStatusEnum } from "../enums/employee-status.enum";
import { CompanyEntity } from "./company.entity";
import { UserEntity } from "./user.entity";
import { EmployeeRoleEntity } from "./employee-role.entity";

@Entity({ name: "employee" })
export class EmployeeEntity extends BaseEntity {
  @ManyToOne(() => CompanyEntity, company => company.employees)
  company: CompanyEntity;

  @OneToOne(() => UserEntity, user => user.employee, { eager: true })
  @JoinColumn()
  user: UserEntity;

  @Column({
    type: "enum",
    enum: EmployeeStatusEnum,
    default: EmployeeStatusEnum.PENDING,
  })
  status: EmployeeStatusEnum;

  @OneToMany(() => EmployeeRoleEntity, role => role.employee, { eager: true })
  roles: EmployeeRoleEntity[];
}
