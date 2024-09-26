import { BaseEntity } from 'src/core/entities/base.entity';
import { WorkRequestEntity } from './work-request.entity';
import { UserEntity } from './user.entity';
export declare class SatisfactionResearchEntity extends BaseEntity {
    programGrade: number;
    plataformGrade: number;
    professionalGrade: number;
    comments: string;
    user: UserEntity;
    workRequest: WorkRequestEntity;
}
