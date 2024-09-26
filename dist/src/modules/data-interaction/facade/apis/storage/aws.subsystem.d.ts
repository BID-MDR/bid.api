import { ConfigService } from "@nestjs/config";
import { S3Client } from "@aws-sdk/client-s3";
export declare class AwsSubsystem {
    private readonly configService;
    s3Client: S3Client;
    constructor(configService: ConfigService);
    uploadMedia(fileMimeType: string, fileName: string, file: Buffer | string): Promise<string>;
    deleteMedia(fileName: string): Promise<void>;
    uploadMediaBuffer(fileMimeType: string, fileName: string, file: Buffer): Promise<string>;
}
