import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from './user.entity';
import { HelpStatusEnum } from '../dtos/help/helpStatus.enum';
export declare class HelpEntity extends BaseEntity {
    user: UserEntity;
    content: string;
    sentAt: Date;
    status: HelpStatusEnum;
}
