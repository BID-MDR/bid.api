import { UserEntity } from '../../entitites/user.entity';
export declare class CreateTechnicalVisitDto {
    from: Date;
    to: Date;
    professionalId: string;
    professional: UserEntity;
    beneficiaryId: string;
    beneficiary: UserEntity;
}
