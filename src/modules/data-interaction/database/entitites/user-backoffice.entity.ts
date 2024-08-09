import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity } from "typeorm";
import { UserTypeEnum } from "../enums/user-type.enum";
import { UserProgramTypeEnum } from "../enums/user-program-type.enum";
import { UserBackofficeTypeEnum } from "src/modules/backoffice/user/dto/userTypeEnum";
import { FunctionTypeEnum } from "src/modules/backoffice/user/dto/functionTypeEnum";

@Entity({ name: "user_backoffice" })
export class UserBackofficeEntity extends BaseEntity {
  @Column({
    type: "enum",
    enum: UserBackofficeTypeEnum,
    default: UserBackofficeTypeEnum.BACKOFFICE,
  })
  type: UserBackofficeTypeEnum;

  @Column({
    type: "varchar",
    length: 50,
  })
  name: string;

  @Column({
    type: "enum",
    enum: FunctionTypeEnum,
    nullable: true,
  })
  function: FunctionTypeEnum;

  @Column({
    type: "varchar",
    length: 50,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  password: string;


}
