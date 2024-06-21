import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { GovbrSsoInfoToRegisterEntity } from './govbr-sso-info-to-register.entity';

@Entity({ name: 'govbr-sso' })
export class GovbrSsoEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 200,
    })
    codeVerifier: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    codeChallenge: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true,
    })
    token: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    registered: boolean;

    @OneToOne(() => GovbrSsoInfoToRegisterEntity, (infoToRegister) => infoToRegister.govbrSso, {
        cascade: true,
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn()
    infoToRegister: GovbrSsoInfoToRegisterEntity;
}
