import { UserEntity } from '../../entitites/user.entity';
export declare class MessageRegisterRequestDto {
    content: string;
    identifier: string;
    sender: UserEntity;
    receiver: UserEntity;
    client1?: string;
    client2?: string;
}
