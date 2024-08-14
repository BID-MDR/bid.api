import { Entity, Column, ManyToOne, ManyToMany } from "typeorm";
import { BaseEntity } from "../../../../core/entities/base.entity";
import { FunctionTypeEnum } from "src/modules/backoffice/user/dto/functionTypeEnum";
import { UserBackofficeEntity } from "./user-backoffice.entity";

@Entity({ name: "user_roles_backoffice" })
export class UserRolesBackofficeEntity extends BaseEntity {
  @Column({
    type: "enum",
    enum: FunctionTypeEnum,
  })
  role: FunctionTypeEnum;

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

  @ManyToMany(() => UserBackofficeEntity, user => user.roles)
  user: UserBackofficeEntity;
}