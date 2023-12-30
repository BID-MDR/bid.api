import { Injectable } from '@nestjs/common';

@Injectable()
export class GovbrFacade {
    constructor(private readonly govbrSubsystem: GovbrSubsystem) {}

    async login(code: string, codeVerifier: string) {
        return this.govbrSubsystem.login(code, codeVerifier);
    }
}
