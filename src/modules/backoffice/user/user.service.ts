import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { BaseService } from "src/core/services/base.service";
import { UserBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-backoffice.entity";
import { UserBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user.repository";
import { EmailFacade } from "src/modules/data-interaction/facade/apis/email/email.facade";
import { CaubFacade } from "src/modules/data-interaction/facade/apis/gov/caubr/caub.facade";
import { ConfeaFacade } from "src/modules/data-interaction/facade/apis/gov/confea/confea.facade";
import { StorageFacade } from "src/modules/data-interaction/facade/apis/storage/storage.facade";
import { CreateUserBackofficeDto } from "./dto/create-user-backoffice.dto";
import { UserRolesBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user-roles.repository";

@Injectable()
export class UserService extends BaseService<UserBackofficeEntity, CreateUserBackofficeDto, any> {
    constructor(
        private userBackofficeRepository: UserBackofficeRepository,
        private userRoleBackofficeRepository: UserRolesBackofficeRepository,

        private readonly caubFacade: CaubFacade,
        private readonly confeaFacade: ConfeaFacade,
        private readonly emailFacade: EmailFacade,
        private readonly storageFacade: StorageFacade,
        private readonly configService: ConfigService,
    ) {
        super(userBackofficeRepository);
    }

    async create(data: CreateUserBackofficeDto): Promise<any> {
        data.password = await this.hashStringData(data.password);

        data.roles = [];

        for(let i =0; i< data.rolesId.length ; i++){
            let role = await this.userRoleBackofficeRepository.findById(data.rolesId[i]);
            if(role){
                console.log(role);
                data.roles.push(role);
            }
            else
                throw new BadRequestException("Role não encontrada.");
        }

        return await super.create(data);
    }


    private async hashStringData(stringData: string): Promise<string> {
        return bcrypt.hash(stringData, 13);
    }
}