import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserStatusEnum } from 'src/modules/backoffice/user/dto/userStatusEnum';
import { UserBackofficeTypeEnum } from 'src/modules/backoffice/user/dto/userTypeEnum';
import { UserProgramTypeEnum } from 'src/modules/data-interaction/database/enums/user-program-type.enum';
import { UserBackofficeRepository } from 'src/modules/data-interaction/database/repositories/backoffice/user/user.repository';

@Injectable()
export class SeedService {
    private logger = new Logger(SeedService.name);

    constructor(
      private userRepository: UserBackofficeRepository
    ) {
    }

    async seedDev() {
        this.logger.debug('Seeding Dev Environment!');

        const password = 'Pasw0rds';

        const dataMINHA_CASA = {
          name: 'Admin MINHA_CASA',
          email: 'adminMINHA_CASA@admin.com',
          type: UserBackofficeTypeEnum.BACKOFFICE,
          password: await bcrypt.hash(password, 8),
          lastAccess: null,
          timeView: null,
          status:UserStatusEnum.ACTIVE,
          programType: UserProgramTypeEnum.MINHA_CASA
        };

        const dataREGMEL= {
          name: 'Admin REGMEL',
          email: 'adminREGMEL@admin.com',
          type: UserBackofficeTypeEnum.BACKOFFICE,
          password: await bcrypt.hash(password, 8),
          lastAccess: null,
          timeView: null,
          status:UserStatusEnum.ACTIVE,
          programType: UserProgramTypeEnum.REGMEL
        };
    


        await this.userRepository.create(dataMINHA_CASA);
        await this.userRepository.create(dataREGMEL);

        this.logger.debug(`Seed user created`);
    }
}
