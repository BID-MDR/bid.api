import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FeatureSurveyController } from './feature-survey.controller';
import { FeatureSurveyService } from './feature-survey.service';

@Module({
    imports: [DatabaseModule],
    controllers: [FeatureSurveyController],
    providers: [FeatureSurveyService],
})
export class FeatureSurveyModule {}
