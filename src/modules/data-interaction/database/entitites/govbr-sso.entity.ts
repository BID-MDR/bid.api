import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'govbrsso' })
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
}
