import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string;
}
