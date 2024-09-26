import { UserBackofficeEntity } from 'src/modules/data-interaction/database/entitites/user-backoffice.entity';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
export declare class MessageBackofficeRegisterRequestDto {
    content: string;
    identifier: string;
    sender: UserBackofficeEntity;
    receiver: UserEntity;
    client1?: string;
    client2?: string;
}
