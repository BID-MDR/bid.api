import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { UserBackofficeTypeEnum } from "src/modules/backoffice/user/dto/userTypeEnum";
import { UserRolesBackofficeEntity } from "./user-roles-backoffice.entity";

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
  type: "varchar",
  length: 50,
  })
  email: string;
    
  @Column({
  type: "varchar",
  length: 100,
  })
  password: string;

  @Column({
    type: "datetime",
    nullable: true,
  })
  lastAccess: Date;

  @Column({
    type: "int",
    nullable: true,
  })
  timeView: number;
      
      
  @ManyToMany(() => UserRolesBackofficeEntity, roles => roles.user, { eager: true })
  @JoinTable()
  roles: UserRolesBackofficeEntity[];
}
