import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { BaseService } from "src/core/services/base.service";
import { UserBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-backoffice.entity";
import { UserBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user.repository";

import { CreateUserBackofficeDto } from "./dto/create-user-backoffice.dto";
import { UserRolesBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user-roles.repository";
import { JwtPayloadBackoffice } from "src/core/interfaces/jwt-payload-backoffice.interface";
import { EnviromentVariablesEnum } from "src/core/enums/environment-variables.enum";
import { UserRegisterPasswordDto } from "./dto/user-register-password.dto";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { SatisfactionResearchRepository } from "src/modules/data-interaction/database/repositories/satisfaction-research/satisfaction-research.repository";
import { SatisfactionResearchEntity } from "src/modules/data-interaction/database/entitites/satisfaction-research.entity";

@Injectable()
export class UserService extends BaseService<UserBackofficeEntity, CreateUserBackofficeDto, any> {
    constructor(
        private userBackofficeRepository: UserBackofficeRepository,
        private userRoleBackofficeRepository: UserRolesBackofficeRepository,
        private readonly configService: ConfigService,
        private readonly userProfessionalRepo: UserRepository,
        private satisfactionResearchRepo: SatisfactionResearchRepository
    ) {
        super(userBackofficeRepository);
    }

    async findAllRegmel(): Promise<any[]>{
        return await this.userBackofficeRepository.getRegmel()
    }

    async findAllMinhaCasa(): Promise<any[]>{
        return await this.userBackofficeRepository.getMinhaCasa()
    }
        async findProfessionalBackofficeMinhaCasa(): Promise<any[]>{
        return await this.userProfessionalRepo.findProfessionalBackoffice()
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
    async update(id: string, data: CreateUserBackofficeDto): Promise<any> {

        const user = await this.userBackofficeRepository.getById(id);

        user.email = data.email;
        user.name = data.name;
        user.status = data.status;
        user.timeView = data.timeView;

        await user.save();

        if(data.rolesId) {
        for(let i =0; i< data.rolesId.length ; i++){
               user.roles = []
            let role = await this.userRoleBackofficeRepository.findById(data.rolesId[i]);
            if(role){
                user.roles.push(role);
            }
            else
                throw new BadRequestException("Role não encontrada.");
        }
        }

        return await user.save();
    }
async getDataForResearchManagerPage(): Promise<{
  beneficiarioCount: { program: number; plataform: number; iteration: number };
  professionalCount: { program: number; plataform: number; iteration: number };
  list: SatisfactionResearchEntity[];
}> {
  const beneficiaryData = await this.satisfactionResearchRepo.listBeneficiaryMinhaCasa();
  const professionalData = await this.satisfactionResearchRepo.listProfessionalMinhaCasa();
 const avg = (
    arr: SatisfactionResearchEntity[],
    key: keyof SatisfactionResearchEntity
  ): number => {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((total, item) => total + (item[key] as unknown as number), 0);
    const value = sum / arr.length;
    return Number(value.toFixed(2));
  };

  return {
    beneficiarioCount: {
      program:   avg(beneficiaryData, 'programGrade'),
      plataform: avg(beneficiaryData, 'plataformGrade'),
      iteration: avg(beneficiaryData, 'professionalGrade'),
    },
    professionalCount: {
      program:   avg(professionalData, 'programGrade'),
      plataform: avg(professionalData, 'plataformGrade'),
      iteration: avg(professionalData, 'professionalGrade'),
    },
    list: [...beneficiaryData, ...professionalData],
  };
}
async getDataForResearchManagerPageREGMEL(): Promise<{
  beneficiarioCount: { program: number; plataform: number; iteration: number };
  professionalCount: { program: number; plataform: number; iteration: number };
  list: SatisfactionResearchEntity[];
}> {
  const beneficiaryData = await this.satisfactionResearchRepo.listBeneficiaryREGMEL();
  const professionalData = await this.satisfactionResearchRepo.listProfessionalREGMEL();
 const avg = (
    arr: SatisfactionResearchEntity[],
    key: keyof SatisfactionResearchEntity
  ): number => {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((total, item) => total + (item[key] as unknown as number), 0);
    const value = sum / arr.length;
    return Number(value.toFixed(2));
  };
  return {
    beneficiarioCount: {
      program:   avg(beneficiaryData, 'programGrade'),
      plataform: avg(beneficiaryData, 'plataformGrade'),
      iteration: avg(beneficiaryData, 'professionalGrade'),
    },
    professionalCount: {
      program:   avg(professionalData, 'programGrade'),
      plataform: avg(professionalData, 'plataformGrade'),
      iteration: avg(professionalData, 'professionalGrade'),
    },
    list: [...beneficiaryData, ...professionalData],
  };
}

}