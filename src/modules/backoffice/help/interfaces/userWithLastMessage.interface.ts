import { UserBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-backoffice.entity";


export interface UserWithLastMessageBackoffice {
  user: UserBackofficeEntity;
  lastMessage: string;
  lastMessageTime: Date;
}
