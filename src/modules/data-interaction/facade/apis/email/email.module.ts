import { Module } from '@nestjs/common';
import { SendGridSubsystem } from './send-grid.subsystem';
import { EmailFacade } from './email.facade';

@Module({
    providers: [SendGridSubsystem, EmailFacade],
    exports: [EmailFacade],
})
export class EmailModule {}
