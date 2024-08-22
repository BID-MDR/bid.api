import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { PropertyTypeEnum } from '../enums/property-type.enum';
import { CostEstimationEntity } from './cost-estimation.entity';
import { TechnicalVisitEntity } from './technical-visit.entity';
import { UserGeneratedMediaEntity } from './user-generated-media.entity';
import { UserEntity } from './user.entity';
import { WorkRequestPrecarityEntity } from './work-request-precarity.entity';
import { WorkRequestPrevailingConstructionMaterialEntity } from './work-request-prevailing-construction-materials.entity';
import { WorkRequestRoomToWorkEntity } from './work-request-room-to-work.entity';
import { WorkRequestRoomTypeQuantityEntity } from './work-request-room-type-quantity.entity';
import { WorkRequestWelfareProgramEntity } from './work-request-welfare-program.entity';
import { AddressEntity } from './address.entity';

@Entity({ name: 'work-request' })
export class WorkRequestEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 100,
    })
    description: string;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    numberOfResidents: number;

    @Column({
        type: 'varchar',
        length: 70,
    })
    responsiblePersonName: string;

    @OneToOne(() => AddressEntity, (address) => address.workRequest, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    address: AddressEntity;

    @OneToMany(() => WorkRequestWelfareProgramEntity, (welfareProgram) => welfareProgram.workRequest, {
        cascade: true,
        eager: true,
    })
    welfarePrograms: WorkRequestWelfareProgramEntity[];
 
    @Column({
        type: 'enum',
        enum: PropertyTypeEnum,
    })
    propertyType: PropertyTypeEnum;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    floorCount: number;

    @OneToMany(
        () => WorkRequestPrevailingConstructionMaterialEntity,
        (prevailingConstructionMaterial) => prevailingConstructionMaterial.workRequest,
        {
            cascade: true,
            eager: true,
        },
    )
    prevalingConstructionMaterials: WorkRequestPrevailingConstructionMaterialEntity[];

    @OneToMany(() => WorkRequestRoomTypeQuantityEntity, (roomTypeQuantity) => roomTypeQuantity.workRequest, {
        cascade: true,
        eager: true,
    })
    roomsAvailableAndQuantity: WorkRequestRoomTypeQuantityEntity[];

    @OneToMany(() => WorkRequestRoomToWorkEntity, (roomToWork) => roomToWork.workRequest, {
        cascade: true,
        eager: true,
    })
    roomsToBeWorked: WorkRequestRoomToWorkEntity[];

    @OneToMany(() => WorkRequestPrecarityEntity, (precarity) => precarity.workRequest, {
        cascade: true,
        eager: true,
    })
    precaritysToBeSolved: WorkRequestPrecarityEntity[];

    @Column({
        type: 'varchar',
        length: 100,
    })
    aditionalInformation: string;

    @OneToMany(() => UserGeneratedMediaEntity, (userGeneratedMediaEntity) => userGeneratedMediaEntity.workRequest, {
        cascade: true,
        eager: true,
    })
    picturesAndVideos: UserGeneratedMediaEntity[];

    @OneToMany(() => TechnicalVisitEntity, (technicalVisit) => technicalVisit.workRequest, {
        eager: true,
    })
    technicalVisits: TechnicalVisitEntity[];

    @OneToMany(() => CostEstimationEntity, (costEstimation) => costEstimation.workRequest, {
        eager: true,
    })
    costEstimations: CostEstimationEntity[];

    @OneToOne(() => UserEntity, (user) => user.workRequest, {
        eager: true,
    })
    @JoinColumn()
    beneficiary: UserEntity;
}
