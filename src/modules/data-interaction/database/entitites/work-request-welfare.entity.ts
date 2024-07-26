import { Column, Entity, ManyToOne } from "typeorm";
import { WelfareProgramEnum } from "../enums/welfare-program.enum";
import { WorkRequestEntity } from "./work-request.entity";
import { BaseEntity } from "../../../../core/entities/base.entity";

@Entity({ name: "work_request_welfare" })
export class WorkRequestWelfareEntity extends BaseEntity {
    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.welfare)
    workRequest: WorkRequestEntity;

    @Column({
        enum: WelfareProgramEnum,
        type: "enum",
        default: WelfareProgramEnum.NOT_APPLY,
    })
    welfareProgram: WelfareProgramEnum;
}
