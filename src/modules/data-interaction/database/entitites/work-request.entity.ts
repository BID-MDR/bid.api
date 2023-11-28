import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PrevalingConstructionMaterialsEnum } from '../enums/prevailing-construction-materials.enum';
import { PropertyTypeEnum } from '../enums/property-type.enum';
import { WorkRequestRoomToWorkEntity } from './work-request-room-to-work.entity';
import { WorkRequestRoomTypeQuantityEntity } from './work-request-room-type-quantity.entity';
import { WorkRequestMediaEntity } from './work-request-media.entity';
import { WorkRequestWelfareProgramEntity } from './work-request-welfare-program.entity';
import { WorkRequestPrevailingConstructionMaterialEntity } from './work-request-prevailing-construction-materials.entity';
import { WorkRequestPrecarityEntity } from './work-request-precarity.entity';
import { TechnicalVisitEntity } from './technical-visit.entity';

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

    @OneToMany(() => WorkRequestMediaEntity, (workRequestMedia) => workRequestMedia.workRequest, {
        cascade: true,
        eager: true,
    })
    picturesAndVideos: WorkRequestMediaEntity[];

    @OneToMany(() => TechnicalVisitEntity, (technicalVisit) => technicalVisit.workRequest, {
        eager: true,
    })
    technicalVisits: TechnicalVisitEntity[];
}
