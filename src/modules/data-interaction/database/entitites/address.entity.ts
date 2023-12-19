import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { WorkRequestEntity } from './work-request.entity';

@Entity({ name: 'address' })
export class AddressEntity extends BaseEntity {
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
    })
    complement: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    neighborhood: string;

    @Column({
        type: 'varchar',
        length: 6,
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

    @ManyToOne(() => UserEntity, (user) => user.addresses)
    user: UserEntity;

    @OneToOne(() => WorkRequestEntity, (workRequest) => workRequest.address)
    workRequest: WorkRequestEntity;
}
