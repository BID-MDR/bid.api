import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BaseService } from "src/core/services/base.service";
import { UserBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-backoffice.entity";
import { UserBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user.repository";
import { EmailFacade } from "src/modules/data-interaction/facade/apis/email/email.facade";
import { CaubFacade } from "src/modules/data-interaction/facade/apis/gov/caubr/caub.facade";
import { ConfeaFacade } from "src/modules/data-interaction/facade/apis/gov/confea/confea.facade";
import { StorageFacade } from "src/modules/data-interaction/facade/apis/storage/storage.facade";

@Injectable()
export class UserService extends BaseService<UserBackofficeEntity, any, any> {
    constructor(
        private userBackofficeRepository: UserBackofficeRepository,
        private readonly caubFacade: CaubFacade,
        private readonly confeaFacade: ConfeaFacade,
        private readonly emailFacade: EmailFacade,
        private readonly storageFacade: StorageFacade,
        private readonly configService: ConfigService,
    ) {
        super(userBackofficeRepository);
    }
}