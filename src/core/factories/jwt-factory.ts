import { ConfigService } from "@nestjs/config";
import { EnviromentVariablesEnum } from "../enums/environment-variables.enum";


export const jwtFactory = {
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get(EnviromentVariablesEnum.JWT_PAYLOAD_KEY),
        signOptions: {
            expiresIn: Number(EnviromentVariablesEnum.JWT_ACCESS_TOKEN_EXPIRATION)
        }
    }),
    inject: [
        ConfigService
    ]
};