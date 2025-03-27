import { Module } from '@nestjs/common';
import { AwsSubsystem } from './aws.subsystem';
import { StorageFacade } from './storage.facade';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [AwsSubsystem, StorageFacade],
    exports: [AwsSubsystem, StorageFacade],
})

export class StorageModule {}
