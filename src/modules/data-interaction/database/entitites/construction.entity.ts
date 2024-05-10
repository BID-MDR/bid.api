import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ConstructionStatusEnum } from '../enums/construction-status.enum';
import { ContractEntity } from './contract.entity';
import { RoomSolutionEntity } from './room-solution.entity';
import { RenovationProjectEntity } from './renovation-project.entity';
import { AddressEntity } from './address.entity';
import { ConstructionType } from '../enums/construction-type.enum';

@Entity({ name: 'construction' })
export class ConstructionEntity extends BaseEntity {
    // @Column({
    //     type: 'varchar',
    //     length: 36, // ou o tamanho adequado para o ID do projeto
    //     nullable: true, // torna o campo opcional
    // })
    // renovationProjectId: string | null;

    // @OneToOne(() => RenovationProjectEntity)
    // @JoinColumn({ name: 'renovationProjectId' })
    // renovationProject: RenovationProjectEntity;

    @OneToMany(() => RoomSolutionEntity, (roomSolution) => roomSolution.construction)
    rooms: RoomSolutionEntity[];

    @OneToOne(() => AddressEntity)
    @JoinColumn()
    address: AddressEntity;

    @Column({
        type: 'enum',
        enum: ConstructionStatusEnum,
        default: ConstructionStatusEnum.EM_ANDAMENTO,
    })
    status: ConstructionStatusEnum;

    @Column({
        type: 'enum',
        enum: ConstructionType,
        nullable: true,

    })
    type: ConstructionType;

    @Column({
        type: 'integer',
        nullable: true,
    })
    area: number;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    description: string;

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
