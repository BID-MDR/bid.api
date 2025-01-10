import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../data-interaction/database/database.module";
import { FacadeModule } from "../../data-interaction/facade/facade.module";
import { FeatureAuthModule } from "../feature-auth/feature-auth.module";
import { BidDocumentController } from "./bidDocument.controller";
import { BidDocumentService } from "./bidDocument.service";

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [BidDocumentService],
    controllers: [BidDocumentController],
})
export class BidDocumentModule {}
