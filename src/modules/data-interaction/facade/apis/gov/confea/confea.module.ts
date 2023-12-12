import { Module } from '@nestjs/common';
import { ConfeaSubsystem } from './confea.subsystem';
import { ConfeaFacade } from './confea.facade';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [ConfeaSubsystem, ConfeaFacade],
    exports: [ConfeaFacade],
})
export class ConfeaModule {}
