import { Module } from '@nestjs/common';
import { CaubModule } from './apis/gov/caubr/caub.module';
import { EmailModule } from './apis/email/email.module';
import { StorageModule } from './apis/storage/storage.module';
import { ConfeaModule } from './apis/gov/confea/confea.module';
import { GovbrModule } from './apis/gov/govbr/govbr.module';

@Module({
    imports: [CaubModule, EmailModule, StorageModule, ConfeaModule, GovbrModule],
    exports: [CaubModule, EmailModule, StorageModule, ConfeaModule, GovbrModule],
})
export class FacadeModule {}
