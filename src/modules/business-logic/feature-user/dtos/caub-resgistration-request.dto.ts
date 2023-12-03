import { IsCPF } from 'brazilian-class-validator';

export class CaubRegistrationRequestDto {
    @IsCPF()
    cpf: string;
}
