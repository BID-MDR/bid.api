import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';

@Injectable()
export class AwsSubsystem {
    s3Client: S3;

    constructor(private readonly configService: ConfigService) {
        this.s3Client = new S3({
            region: this.configService.get(EnviromentVariablesEnum.AWS_BUCKET_REGION),
            credentials: {
                accessKeyId: configService.get(EnviromentVariablesEnum.AWS_BUCKET_ACCESS_KEY_ID),
                secretAccessKey: configService.get(EnviromentVariablesEnum.AWS_BUCKET_SECRET_ACCESS_KEY),
            },
            endpoint: configService.get(EnviromentVariablesEnum.AWS_BUCKET_ENDPOINT),
            // s3ForcePathStyle: false,
        });
    }

    async uploadMedia(fileMimeType: string, fileName: string, file: Buffer | string) {
        

        return await this.s3Client
            .upload({
                Bucket: S3_BUCKET,
                Key: directory ? `${directory}/${key}` : key,
                Body: buffer,
                // ContentEncoding: 'base64',
                ContentType: type,
                ACL: 'public-read',
            })
            .promise();
    }
}
