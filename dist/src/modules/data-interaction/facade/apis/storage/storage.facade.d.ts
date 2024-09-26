import { AwsSubsystem } from './aws.subsystem';
export declare class StorageFacade {
    private readonly awsSubsystem;
    constructor(awsSubsystem: AwsSubsystem);
    uploadMedia(fileMimeType: string, fileName: string, file: Buffer | string): Promise<string>;
}
