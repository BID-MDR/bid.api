import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string;
}
