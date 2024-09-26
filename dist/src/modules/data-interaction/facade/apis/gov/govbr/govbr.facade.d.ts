import { GovbrSubsystem } from './govbr.subsystem';
export declare class GovbrFacade {
    private readonly govbrSubsystem;
    constructor(govbrSubsystem: GovbrSubsystem);
    login(code: string, codeVerifier: string): Promise<import("../../../../../business-logic/feature-auth/dtos/govbr-token-payload.dto").GovbrTokenPayloadDto>;
    getJwk(): Promise<any>;
}
