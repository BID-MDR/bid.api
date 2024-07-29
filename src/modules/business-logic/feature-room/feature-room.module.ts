import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';
import { FeatureRoomService } from './feature-room.service';
import { FeatureRoomController } from './feature-room.controller';
import { RoomSolutionRepository } from 'src/modules/data-interaction/database/repositories/room/room-solution.repository';

@Module({
    imports: [
        DatabaseModule,
        FacadeModule,

    ],
    controllers: [FeatureRoomController],
    providers: [
        FeatureRoomService
    ],
})
export class FeatureRoomModule {}
