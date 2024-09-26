import { UserEntity } from "../../entitites/user.entity";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
export declare class CreateSatisfactionResearchDto {
    programGrade: number;
    plataformGrade: number;
    professionalGrade: number;
    comments?: string;
    user?: UserEntity;
    workRequest?: WorkRequestEntity;
}
