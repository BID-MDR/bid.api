import { Module } from '@nestjs/common';
import { CaubModule } from './apis/gov/caubr/caub.module';

@Module({
    imports: [CaubModule],
})
export class FacadeModule {}
