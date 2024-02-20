import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GovbrFacade } from './govbr.facade';
import { GovbrSubsystem } from './govbr.subsystem';

@Module({
    imports: [HttpModule],
    providers: [GovbrFacade, GovbrSubsystem],
    exports: [GovbrFacade],
})
export class GovbrModule {}
