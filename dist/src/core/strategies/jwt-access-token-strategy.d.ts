import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';
declare const JwtAccessTokenStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class JwtAccessTokenStrategy extends JwtAccessTokenStrategy_base {
    readonly configService: ConfigService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayloadInterface): Promise<JwtPayloadInterface>;
}
export {};
