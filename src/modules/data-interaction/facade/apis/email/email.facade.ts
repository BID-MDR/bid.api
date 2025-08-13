import { Injectable } from '@nestjs/common';
import { EmailRepository } from '../../../database/repositories/backoffice/email/email.repository';

@Injectable()
export class EmailFacade {
    constructor(private readonly emailRepo: EmailRepository) { }

    async sendPasswordResetCodeEmail(code: string, userEmail: string) {
        return this.emailRepo.send(
            userEmail,
            'Recuperação de senha',
            `Seu código de recuperação de senha é: ${code}`,
            `<strong>Seu código de recuperação de senha é: ${code}</strong>`,
        );
    }

    async sendProfessionalNotFoundEmail(params: {
        neighborhood: string;
        city: string;
        state: string;
        latitude: number | string;
        longitude: number | string;
    }) {
        return this.emailRepo.sendProfessionalNotFound(params);
    }
}