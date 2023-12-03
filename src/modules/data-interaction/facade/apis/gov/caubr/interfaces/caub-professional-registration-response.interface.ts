export interface CaubProfessionalRegistrationResponse {
    retorno: {
        attributes: {
            'xsi:type': string;
        };
        cpf: {
            attributes: {
                'xsi:type': string;
            };
            $value: string;
        };
        existe: {
            attributes: {
                'xsi:type': string;
            };
            $value: boolean;
        };
        situacao_cau: {
            attributes: {
                'xsi:type': string;
            };
            $value: string;
        };
    };
}
