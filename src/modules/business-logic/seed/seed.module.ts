import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { SeedService } from "./seed.service";
import { AppSeedCommand } from "./app-seed.command";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [ SeedService, AppSeedCommand],
})
export class SeedModule {}
