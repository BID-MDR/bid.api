import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { UserBackofficeTypeEnum } from "src/modules/backoffice/user/dto/userTypeEnum";
import { UserRolesBackofficeEntity } from "./user-roles-backoffice.entity";
import { UserOtpStatusEnum } from "../enums/user-otp.enum";
import { UserStatusEnum } from "src/modules/backoffice/user/dto/userStatusEnum";
import { MessageBackofficeEntity } from "./message-backoffice.entity";
import { UserProgramTypeEnum } from "../enums/user-program-type.enum";

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
  nullable: true
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
      

  @Column({
    type: "enum",
    enum: UserStatusEnum,
    default: UserStatusEnum.ACTIVE,
  })
  status: UserStatusEnum;

  @Column({
    type: "enum",
    enum: UserProgramTypeEnum,
    nullable: true,
  })
  programType: UserProgramTypeEnum;

  @OneToMany(() => MessageBackofficeEntity, message => message.sender)
  sentMessages: MessageBackofficeEntity[];

  @OneToMany(() => MessageBackofficeEntity, message => message.receiver)
  receivedMessages: MessageBackofficeEntity[];
      
  @ManyToMany(() => UserRolesBackofficeEntity, roles => roles.user, { eager: true})
  @JoinTable()
  roles: UserRolesBackofficeEntity[];
}
