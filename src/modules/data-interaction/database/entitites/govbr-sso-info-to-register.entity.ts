import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { GovbrSsoEntity } from './govbr-sso.entity';
import { BaseEntity } from 'src/core/entities/base.entity';

@Entity({ name: 'govbrsso-info-to-register' })
export class GovbrSsoInfoToRegisterEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 200,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 15,
    })
    cpf: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: true,
    })
    phone: string;

    @OneToOne(() => GovbrSsoEntity, (govbrsso) => govbrsso.infoToRegister)
    govbrSso: GovbrSsoEntity;

    constructor(name: string, cpf: string, email: string, phone: string) {
        super();
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.phone = phone;
    }
}
