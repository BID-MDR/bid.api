import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';

@Controller()
export class AppController {
    constructor(private readonly configService: ConfigService) {}

    @Get()
    @ApiExcludeEndpoint()
    redirect(@Res() res: Response) {
        if (
            this.configService.get(EnviromentVariablesEnum.ENABLE_DOCS) ===
            'true'
        ) {
            res.redirect(
                `v${this.configService.get(
                    EnviromentVariablesEnum.APP_VERSION,
                )}/docs`,
            );
        } else {
            res.status(404).send('API Documentation is disabled');
        }
    }
}
