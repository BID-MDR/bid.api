

import { Module } from "@nestjs/common";
import { FeatureAuthModule } from "src/modules/business-logic/feature-auth/feature-auth.module";
import { DatabaseModule } from "src/modules/data-interaction/database/database.module";
import { FacadeModule } from "src/modules/data-interaction/facade/facade.module";
import { AuthenticateService } from "./authenticate.service";
import { AuthenticateController } from "./authenticate.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtFactory } from "src/core/factories/jwt-factory";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule ,PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.registerAsync(jwtFactory),],
    providers: [AuthenticateService],
    controllers: [AuthenticateController],
})
export class AuthenticateModule {}
