import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';
import { HelpService } from './help.service';
import { HelpController } from './help.controller';

@Module({
    imports: [
        DatabaseModule,
        FacadeModule,

    ],
    controllers: [HelpController],
    providers: [HelpService],
    exports: [HelpService]
})
export class HelpModule {}
