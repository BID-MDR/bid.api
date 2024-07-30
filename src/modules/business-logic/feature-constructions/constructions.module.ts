import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { ConstructionsController } from "./constructions.controller";
import { ConstructionsService } from "./constructions.service";

@Module({
    imports: [DatabaseModule, FacadeModule],
    controllers: [ConstructionsController],
    providers: [ConstructionsService],
})
export class ConstructionsModule {}
