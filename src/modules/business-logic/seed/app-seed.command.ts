import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { SeedService } from './seed.service';

@Command({
    name: 'seed',
    description: 'Seeds the database with default data',
    arguments: '<environment>',
    argsDescription: {
        environment: 'The environment to seed',
    },
})
export class AppSeedCommand extends CommandRunner {
    private logger = new Logger(AppSeedCommand.name);

    constructor(private readonly seedService: SeedService) {
        super();
    }

    async run(inputs: string[]): Promise<void> {
        this.logger.debug('Seed started!!');

        const environment = inputs[0];

        switch (environment) {
            case 'dev':
                await this.seedService.seedDev();
                break;
            default:
                this.logger.warn('Environment not recognized. Using dev as default.');
                await this.seedService.seedDev();
                break;
        }

        this.logger.debug('Seed finished!');
    }
}
