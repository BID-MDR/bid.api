import { IsCPF } from 'brazilian-class-validator';

export class ProfessionalCouncilRegistrationRequestDto {
    @IsCPF()
    cpf: string;
}
