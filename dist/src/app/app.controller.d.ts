import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
export declare class AppController {
    private readonly configService;
    constructor(configService: ConfigService);
    redirect(res: Response): void;
}
