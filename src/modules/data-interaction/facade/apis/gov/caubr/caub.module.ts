import { Module } from '@nestjs/common';
import { CaubSubsystem } from './caub.subsystem';
import { CaubFacade } from './caub.facade';

@Module({
    providers: [CaubSubsystem, CaubFacade],
    exports: [CaubFacade],
})
export class CaubModule {}
