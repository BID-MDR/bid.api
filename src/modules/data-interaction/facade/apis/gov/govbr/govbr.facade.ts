import { Injectable } from '@nestjs/common';
import { GovbrSubsystem } from './govbr.subsystem';

@Injectable()
export class GovbrFacade {
    constructor(private readonly govbrSubsystem: GovbrSubsystem) {}

    async login(code: string, codeVerifier: string) {
        return this.govbrSubsystem.login(code, codeVerifier);
    }

    async getJwk() {
        return this.govbrSubsystem.getJwk();
    }
}
