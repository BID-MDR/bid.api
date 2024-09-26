import { WelfareProgramEnum } from "../enums/welfare-program.enum";
import { WorkRequestEntity } from "./work-request.entity";
import { BaseEntity } from "../../../../core/entities/base.entity";
export declare class WorkRequestWelfareEntity extends BaseEntity {
    workRequest: WorkRequestEntity;
    welfareProgram: WelfareProgramEnum;
}
