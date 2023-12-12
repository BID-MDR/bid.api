import { Module } from '@nestjs/common';
import { CaubModule } from './apis/gov/caubr/caub.module';
import { EmailModule } from './apis/email/email.module';
import { StorageModule } from './apis/storage/storage.module';
import { ConfeaModule } from './apis/gov/confea/confea.module';

@Module({
    imports: [CaubModule, EmailModule, StorageModule, ConfeaModule],
    exports: [CaubModule, EmailModule, StorageModule, ConfeaModule],
})
export class FacadeModule {}
