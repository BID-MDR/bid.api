"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsSubsystem = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const environment_variables_enum_1 = require("../../../../../core/enums/environment-variables.enum");
let AwsSubsystem = class AwsSubsystem {
    configService;
    s3Client;
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_REGION),
            credentials: {
                accessKeyId: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_ACCESS_KEY_ID),
                secretAccessKey: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_SECRET_ACCESS_KEY),
            },
            endpoint: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_ENDPOINT),
        });
    }
    async uploadMedia(fileMimeType, fileName, file) {
        if (typeof file === "string") {
            file = Buffer.from(file.split(";base64,").pop(), "base64");
        }
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_NAME),
            Key: fileName,
            Body: file,
            ContentType: fileMimeType,
            ACL: "public-read",
        }));
        return encodeURI(`https://${this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_NAME)}.s3.${this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_REGION)}.amazonaws.com/${fileName}`);
    }
    async deleteMedia(fileName) {
        await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_NAME),
            Key: fileName,
        }));
    }
    async uploadMediaBuffer(fileMimeType, fileName, file) {
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_NAME),
            Key: fileName,
            Body: file,
            ContentType: fileMimeType,
            ACL: "public-read",
        }));
        return encodeURI(`https://${this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_NAME)}.s3.${this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.AWS_BUCKET_REGION)}.amazonaws.com/${fileName}`);
    }
};
exports.AwsSubsystem = AwsSubsystem;
exports.AwsSubsystem = AwsSubsystem = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsSubsystem);
//# sourceMappingURL=aws.subsystem.js.map