import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../../core/entities/base.entity";
import { EmployeeRoleEnum } from "../enums/employee-role.enum";
import { EmployeeEntity } from "./employee.entity";

@Entity({ name: "employee_role" })
export class EmployeeRoleEntity extends BaseEntity {
  @Column({
    type: "enum",
    enum: EmployeeRoleEnum,
  })
  role: EmployeeRoleEnum;

  @Column({
    type: "varchar",
    length: 100,
    default: "Sem descrição",
  })
  description: string;

  @Column({
    type: "boolean",
    default: true,
  })
  active: boolean;

  @ManyToOne(() => EmployeeEntity, employee => employee.roles)
  employee: EmployeeEntity;
}