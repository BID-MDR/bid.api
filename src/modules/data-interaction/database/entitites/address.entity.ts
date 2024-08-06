import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { UserProfessionalInfoEntity } from './user-professional-info.entity';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'address' })
export class AddressEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 2,
    })
    state: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    nickname: string;

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

    @Column({
        type: 'smallint',
        unsigned: true,
        nullable: true,
    })
    maximumDistanceToWorks: number;

    @OneToOne(() => UserEntity, (user) => user.address)
    user: UserEntity;

    @ManyToOne(() => UserProfessionalInfoEntity, (userProfessionalInfoEntity) => userProfessionalInfoEntity.addresses)
    userProfessionalInfo: UserProfessionalInfoEntity;

    @OneToOne(() => CompanyEntity, (company) => company.addresses)
    company: CompanyEntity;
}