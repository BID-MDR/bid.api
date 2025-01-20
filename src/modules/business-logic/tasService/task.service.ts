import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UnavailabilityRepository } from 'src/modules/data-interaction/database/repositories/unavailability/unavailability.repository';


@Injectable()
export class TaskService implements OnModuleInit{
  private readonly _logger = new Logger(TaskService.name);
  constructor(private _unavailabilityRepo: UnavailabilityRepository) {}

  onModuleInit() {
    this._logger.debug('TaskService initialized');
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async deleteExpiredVerifications() {
    this._logger.debug('Routine deleteExpiredVerifications started');
    const expiredUnavailability = await this._unavailabilityRepo.findOlderThanAWeek();
    console.log('expiredUnavailability', expiredUnavailability)

    for (const item of expiredUnavailability) {
   
        try {
           await this._unavailabilityRepo.hardDelete(item.id);
          this._logger.debug(`Unavailability ${item.id} deleted`);
        } catch (error) {
          this._logger.error(
            `Failed to delete unavailability ${item.id}: ${error.message}`,
            error.stack,
          );
        }
      
    }
  }
}
