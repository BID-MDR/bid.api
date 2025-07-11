import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';

import { EmailRepository } from '../../../database/repositories/backoffice/email/email.repository';
import { EmailFacade } from './email.facade';
import { SendGridSubsystem } from './send-grid.subsystem';

@Module({
    imports: [
        ConfigModule,
        SendGridModule.forRoot({
            apiKey: process.env.SENDGRID_API_KEY,
        }),
    ],
    providers: [
        SendGridSubsystem,
        EmailRepository,
        EmailFacade,
    ],
    exports: [EmailFacade],
})
export class EmailModule { }
