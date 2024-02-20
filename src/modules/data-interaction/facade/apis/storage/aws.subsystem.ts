import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';

@Injectable()
export class AwsSubsystem {
    s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {
        this.s3Client = new S3Client({
            region: this.configService.get(EnviromentVariablesEnum.AWS_BUCKET_REGION),
            credentials: {
                accessKeyId: configService.get(EnviromentVariablesEnum.AWS_BUCKET_ACCESS_KEY_ID),
                secretAccessKey: configService.get(EnviromentVariablesEnum.AWS_BUCKET_SECRET_ACCESS_KEY),
            },
            endpoint: configService.get(EnviromentVariablesEnum.AWS_BUCKET_ENDPOINT),
        });
    }

    async uploadMedia(fileMimeType: string, fileName: string, file: Buffer | string) {
        if (typeof file === 'string') {
            file = Buffer.from(file.split(';base64,').pop(), 'base64');
        }

        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.get(EnviromentVariablesEnum.AWS_BUCKET_NAME),
                Key: fileName,
                Body: file,
                ContentType: fileMimeType,
                ACL: 'public-read',
            }),
        );

        return encodeURI(
            `https://${this.configService.get(EnviromentVariablesEnum.AWS_BUCKET_NAME)}.s3.${this.configService.get(
                EnviromentVariablesEnum.AWS_BUCKET_REGION,
            )}.amazonaws.com/${fileName}`,
        );
    }
}
