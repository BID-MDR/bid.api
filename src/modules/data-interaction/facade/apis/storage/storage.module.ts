import { Module } from '@nestjs/common';
import { AwsSubsystem } from './aws.subsystem';
import { StorageFacade } from './storage.facade';

@Module({
    providers: [AwsSubsystem, StorageFacade],
    exports: [AwsSubsystem, StorageFacade],
})
export class StorageModule {}
