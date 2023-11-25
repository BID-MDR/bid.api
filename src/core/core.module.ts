import { Module } from '@nestjs/common';
import { ExistsInDBConstraint } from './decorators/class-validator/exists-in-db.validator';

@Module({
    providers: [ExistsInDBConstraint],
    exports: [ExistsInDBConstraint],
})
export class CoreModule {}
