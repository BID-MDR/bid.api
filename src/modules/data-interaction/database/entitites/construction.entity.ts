import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ConstructionStatusEnum } from '../enums/construction-status.enum';
import { ContractEntity } from './contract.entity';
import { RoomSolutionEntity } from './room-solution.entity';

@Entity({ name: 'construction' })
export class ConstructionEntity extends BaseEntity {
    @OneToOne(() => ContractEntity)
    @JoinColumn()
    contract: ContractEntity;

    @OneToMany(() => RoomSolutionEntity, (roomSolution) => roomSolution.construction)
    rooms: RoomSolutionEntity[];

    @Column({
        type: 'enum',
        enum: ConstructionStatusEnum,
        default: ConstructionStatusEnum.EM_ANDAMENTO,
    })
    status: ConstructionStatusEnum;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    artrrt: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    conclusionReport: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    conclusionProfessionalComment: string;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    concludedAt: Date;
}
