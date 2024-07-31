import { UserEntity } from "src/modules/data-interaction/database/entitites/user.entity";

export interface UserWithLastMessage {
  user: UserEntity;
  lastMessage: string;
  lastMessageTime: Date;
}
