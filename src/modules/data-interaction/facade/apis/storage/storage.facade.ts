import { Injectable } from '@nestjs/common';
import { AwsSubsystem } from './aws.subsystem';

@Injectable()
export class StorageFacade {
    constructor(private readonly awsSubsystem: AwsSubsystem) {}

    async uploadMedia(fileMimeType: string, fileName: string, file: Buffer | string) {
        return this.awsSubsystem.uploadMedia(fileMimeType, fileName, file);
    }
}
