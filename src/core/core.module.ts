import { Module } from '@nestjs/common';
import { ExistsInDBConstraint } from './decorators/class-validator/exists-in-db.validator';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token-strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({})],
    providers: [ExistsInDBConstraint, JwtAccessTokenStrategy],
    exports: [ExistsInDBConstraint],
})
export class CoreModule {}
