import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'demands' })
export class DemandEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 100,
    })
    document: string

    @Column({
        type: 'varchar',
        length: 2,
    })
    state: string;


    @Column({
        type: 'varchar',
        length: 50,
    })
    city: string;

    @Column({
        type: 'varchar',
        length: 11,
    })
    zipcode: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    complement: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    neighborhood: string;

    @Column({
        type: 'varchar',
        length: 10,
    })
    number: string;

    @Column({
        type: 'varchar',
        length: 30,
    })
    street: string;

    @Column({
        type: 'varchar',
        length: 30,
    })
    latitude: string;

    @Column({
        type: 'varchar',
        length: 30,
    })
    longitude: string;

    @ManyToOne(() => UserEntity, user => user.demands, {
        eager: true,
    })
    beneficiary: UserEntity;

}
