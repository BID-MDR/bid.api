import { Module } from '@nestjs/common';
import { CaubModule } from './apis/gov/caubr/caub.module';
import { EmailModule } from './apis/email/email.module';

@Module({
    imports: [CaubModule, EmailModule],
    exports: [CaubModule, EmailModule],
})
export class FacadeModule {}
