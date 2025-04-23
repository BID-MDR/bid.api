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
import { JwtPayloadBackoffice } from "src/core/interfaces/jwt-payload-backoffice.interface";
import { EnviromentVariablesEnum } from "src/core/enums/environment-variables.enum";
import { EmailRepository } from "src/modules/data-interaction/database/repositories/backoffice/email/email.repository";
import { UserRegisterPasswordDto } from "./dto/user-register-password.dto";

@Injectable()
export class UserService extends BaseService<UserBackofficeEntity, CreateUserBackofficeDto, any> {
    constructor(
        private userBackofficeRepository: UserBackofficeRepository,
        private userRoleBackofficeRepository: UserRolesBackofficeRepository,

        private readonly caubFacade: CaubFacade,
        private readonly confeaFacade: ConfeaFacade,
        private readonly emailFacade: EmailFacade,
        private readonly emailRepository: EmailRepository,
        private readonly storageFacade: StorageFacade,
        private readonly configService: ConfigService,
    ) {
        super(userBackofficeRepository);
    }

    async findAllRegmel(): Promise<any[]>{
        return await this.userBackofficeRepository.getRegmel()
    }

    async findAllMinhaCasa(): Promise<any[]>{
        return await this.userBackofficeRepository.getMinhaCasa()
    }

    async create(data: CreateUserBackofficeDto): Promise<any> {
        if(data.password){
            data.password = await this.hashStringData(data.password);
        }

        data.roles = [];

        for(let i =0; i< data.rolesId.length ; i++){
            let role = await this.userRoleBackofficeRepository.findById(data.rolesId[i]);
            if(role){
                data.roles.push(role);
            }
            else
                throw new BadRequestException("Role não encontrada.");
        }

        const user =  await super.create(data);

        const linkPaiel = await this.configService.get(EnviromentVariablesEnum.PAINEL_LINK);
        const linkUrl = `${linkPaiel}/auth/first-access/${user.id.toString()}`
        const message = `Seja bem vindo a plataforma, para realizar o cadastro de sua senha clique <a href="${linkUrl}" target="_blank">aqui</a>`
        //await this.emailRepository.send(user.email, 'BID', message, message);
        return user;

    }

    async firstAccess(userId: string, data: UserRegisterPasswordDto ): Promise<any> {
        const user = await this.userBackofficeRepository.getById(userId);
        if(!user) {
          throw new BadRequestException('User not found!');
        }
    
        if(user.password) {
          throw new BadRequestException('User already password!');
        }
    
        data.password = await this.hashStringData(data.password);
    
        return await this.userBackofficeRepository.registerPassword(userId, data);
    }


    private async hashStringData(stringData: string): Promise<string> {
        return bcrypt.hash(stringData, 13);
    }

    async getByPayload(payload: JwtPayloadBackoffice) {
        return await this.userBackofficeRepository.findById(payload.userId);
    }


    async getByEmail(email: string){
        return await this.userBackofficeRepository.getByEmail(email)
    }
    async update(id: string, data: any): Promise<any> {

        const user = await this.userBackofficeRepository.getById(id);

        user.roles = []

        await user.save();


        for(let i =0; i< data.rolesId.length ; i++){
            let role = await this.userRoleBackofficeRepository.findById(data.rolesId[i]);
            if(role){
                user.roles.push(role);
            }
            else
                throw new BadRequestException("Role não encontrada.");
        }
        
        return await user.save();
    }
}