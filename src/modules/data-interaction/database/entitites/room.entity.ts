import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { RoomTypeEnum } from '../enums/room-type.enum';
import { RoomSolutionEntity } from './room-solution.entity';
import { WorkRequestEntity } from './work-request.entity';
import { CostEstimateEntity } from './cost-estimate.entity';
import { InterventionEntity } from './intervention.entity';
import { UserGeneratedMediaEntity } from './user-generated-media.entity';
import { SurveyEntity } from './survey.entity';

@Entity({ name: 'room' })
export class RoomEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 70,
    })
    name: string;

    @Column({
        type: 'enum',
        enum: RoomTypeEnum,
    })
    type: RoomTypeEnum;

    @OneToMany(() => RoomSolutionEntity, (roomSolution) => roomSolution.room, {
        cascade: true,
        eager: true,
    })
    roomSolutions: RoomSolutionEntity[];

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.room)
    workRequest: WorkRequestEntity;

    @ManyToMany(() => CostEstimateEntity, (costEstimate) => costEstimate.rooms)
    @JoinTable({
        name: 'room_cost_estimate',
        joinColumn: { name: 'room_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'cost_estimate_id', referencedColumnName: 'id' },
    })
    costEstimates: CostEstimateEntity[];

    @OneToMany(() => InterventionEntity, (intervention) => intervention.room, {
        cascade: true,
        eager: true,
    })
    interventions: InterventionEntity[];


    @OneToMany(() => UserGeneratedMediaEntity, (userGeneratedMediaEntity) => userGeneratedMediaEntity.startWorkRoom, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    startWorkPhotos?: UserGeneratedMediaEntity[];

    @OneToMany(() => UserGeneratedMediaEntity, (userGeneratedMediaEntity) => userGeneratedMediaEntity.endWorkRoom, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    endWorkPhotos?: UserGeneratedMediaEntity[];

    @ManyToOne(() => SurveyEntity, (survey) => survey.rooms, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    survey?: SurveyEntity[];

    @ManyToOne(() => SurveyEntity, (survey) => survey.improveRooms, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    surveyImproveRooms?: SurveyEntity[];
}
