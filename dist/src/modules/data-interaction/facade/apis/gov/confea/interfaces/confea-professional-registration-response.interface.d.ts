interface Title {
    codigo: number;
    nome: string;
    grupo: string;
    nivel: string;
    modalidade: string;
}
export interface ConfeaProfessionalRegistrationSucessResponse {
    nome: string;
    rnp: string;
    titulos: Title[];
}
export interface ConfeaProfessionalRegistrationErrorResponse {
    message: string;
}
export {};
