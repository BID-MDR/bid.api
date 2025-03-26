import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { EnviromentVariablesEnum } from "src/core/enums/environment-variables.enum";

@Injectable()
export class AwsSubsystem {
  s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: 'sa-saopaulo-1',
      credentials: {
        accessKeyId: 'b66919a3701f48073ff4f1ca8002bf2ec709ec81',
        secretAccessKey: '4WHlfgog0oZI65gWbqZD5mQqAOhAvs9FHlfYVsiy76s=',
      },
      endpoint: 'https://grumzjujmpu4.compat.objectstorage.sa-saopaulo-1.oraclecloud.com',
      forcePathStyle: true,
    });
  }

  async uploadMedia(fileMimeType: string, fileName: string, file: Buffer | string) {
    console.log('dentro do upload media');
    console.log('fileMimeType',fileMimeType);
    console.log('fileName', fileName);
    console.log('file', file);
    if (typeof file === "string" && file.includes(";base64,")) {
      console.log("Dentro do if, convertendo base64 para Buffer...");
      try {
          const base64String = file.split(";base64,").pop();
          if (!base64String) {
              throw new Error("Base64 inválido");
          }
          file = Buffer.from(base64String, "base64");
          console.log("Conversão bem-sucedida!", file);
      } catch (error) {
          console.error("Erro ao converter base64:", error);
      }
  }
    console.log('fora do if ');

    console.log('teste s3 client send',this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'code-s3-001',
        Key: fileName,
        Body: file,
        ContentType: fileMimeType,
        ACL: "public-read",
      })));

    const result = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'code-s3-001',
        Key: fileName,
        Body: file,
        ContentType: fileMimeType,
        ACL: "public-read",
      })
    );

    console.log('result',result);

    if (result.$metadata.httpStatusCode !== 200) throw new Error('Error uploading file')

      const localtion = `https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grumzjujmpu4/b/code-s3-001/o/${fileName}`;
  
      return localtion;

  }

  async deleteMedia(fileName: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get(EnviromentVariablesEnum.AWS_BUCKET_NAME),
        Key: fileName,
      })
    );
  }

  async uploadMediaBuffer(fileMimeType: string, fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get(EnviromentVariablesEnum.AWS_BUCKET_NAME),
        Key: fileName,
        Body: file,
        ContentType: fileMimeType,
        ACL: "public-read",
      })
    );

    return encodeURI(
      `https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grumzjujmpu4/b/${this.configService.get(EnviromentVariablesEnum.AWS_BUCKET_NAME)}/o/${fileName}`
    );
  }
}
