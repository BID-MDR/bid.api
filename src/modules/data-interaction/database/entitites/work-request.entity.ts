import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../../../core/entities/base.entity";
import { FlooringEnum } from "../enums/flooring.enum";
import { KinshipEnum } from "../enums/kinship.enum";
import { PrevalingConstructionMaterialsEnum } from "../enums/prevailing-construction-materials.enum";
import { PropertyTypeEnum } from "../enums/property-type.enum";
import { DemandEntity } from "./demand.entity";
import { RoomEntity } from "./room.entity";
import { WorkRequestWelfareEntity } from "./work-request-welfare.entity";

@Entity({ name: "work_request" })
export class WorkRequestEntity extends BaseEntity {
    @OneToOne(() => DemandEntity, (demand) => demand.workRequest)
    demand: DemandEntity;

    @Column({
        type: "varchar",
        length: 50,
        default: "",
    })
    description: string;

    @Column({
        type: "tinyint",
    })
    resident: number;

    @Column({
        enum: KinshipEnum,
        type: "enum",
        default: KinshipEnum.Me,
    })
    kinship: KinshipEnum;

    @Column({
        enum: PropertyTypeEnum,
        type: "enum",
        default: PropertyTypeEnum.CASA,
    })
    propertyType: PropertyTypeEnum;

    @Column({
        enum: FlooringEnum,
        type: "enum",
        default: FlooringEnum.TERRIO,
    })
    flooring: FlooringEnum;

    @Column({
        enum: PrevalingConstructionMaterialsEnum,
        type: "enum",
        default: PrevalingConstructionMaterialsEnum.TIJOLO,
    })
    prevailingConstructionMaterials: PrevalingConstructionMaterialsEnum;

    @OneToMany(() => RoomEntity, (room) => room.workRequest, {
        cascade: true,
        eager: true,
    })
    room: RoomEntity[];

    @OneToMany(
        () => WorkRequestWelfareEntity,
        (workRequestWelfare) => workRequestWelfare.workRequest,
        { cascade: true, eager: true },
    )
    welfare: WorkRequestWelfareEntity[];
}
