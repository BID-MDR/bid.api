import { ConfigService } from "@nestjs/config";
export declare const jwtFactory: {
    useFactory: (configService: ConfigService) => Promise<{
        secret: any;
        signOptions: {
            expiresIn: number;
        };
    }>;
    inject: (typeof ConfigService)[];
};
