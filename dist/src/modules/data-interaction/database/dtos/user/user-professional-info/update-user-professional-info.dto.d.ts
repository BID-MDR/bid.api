import { CreateUserProfessionalInfoDto } from './create-user-professional-info.dto';
declare const UpdateUserProfessionalInfoDto_base: import("@nestjs/common").Type<Omit<Partial<CreateUserProfessionalInfoDto>, "confeaRegistrationNumber" | "cauRegistrationNumber">>;
export declare class UpdateUserProfessionalInfoDto extends UpdateUserProfessionalInfoDto_base {
    id: string;
}
export {};
