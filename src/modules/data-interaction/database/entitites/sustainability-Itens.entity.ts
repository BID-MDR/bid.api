import { Column, Entity, OneToOne } from "typeorm";
import { DemandEntity } from "./demand.entity";
import { BaseEntity } from "../../../../core/entities/base.entity";
import { RegisterWorkEntity } from "./register-work.entity";

@Entity({ name: "sustainabilityItens" })
export class SustainabilityItensEntity extends BaseEntity {
    @OneToOne(() => DemandEntity, demand => demand.construction)
    demand: DemandEntity;

    @Column({ type: "boolean" })
    creationExpansion: boolean;

    @Column({ type: "boolean" })
    repositioningOfLightPoints: boolean;

    @Column({ type: "boolean" })
    lowConsumptionLamps: boolean;

    @Column({ type: "boolean" })
    waterEfficientShowerInstallation: boolean;

    @Column({ type: "boolean" })
    installingWaterEfficient: boolean;

    @Column({ type: "boolean" })
    tankFaucetInstallationWithWater: boolean;

    @Column({ type: "boolean" })
    installationOfWaterEfficientToilets: boolean;

    @Column({ type: "boolean" })
    waterEfficientFaucetInstallationForKitchen: boolean;

    @Column({ type: "boolean" })
    useOfToiletBowlForOperation: boolean;

    @Column({ type: "boolean" })
    NDA: boolean;

    @OneToOne(() => RegisterWorkEntity, registerWork => registerWork.sustainabilityItens, {
          nullable: true,
        })
    registerWork?: RegisterWorkEntity;
    
}