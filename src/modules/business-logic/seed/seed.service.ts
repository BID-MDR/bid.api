import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FunctionTypeEnum } from 'src/modules/backoffice/user/dto/functionTypeEnum';
import { UserStatusEnum } from 'src/modules/backoffice/user/dto/userStatusEnum';
import { UserBackofficeTypeEnum } from 'src/modules/backoffice/user/dto/userTypeEnum';
import { UserProgramTypeEnum } from 'src/modules/data-interaction/database/enums/user-program-type.enum';
import { UserRolesBackofficeRepository } from 'src/modules/data-interaction/database/repositories/backoffice/user/user-roles.repository';
import { UserBackofficeRepository } from 'src/modules/data-interaction/database/repositories/backoffice/user/user.repository';

@Injectable()
export class SeedService {
  private logger = new Logger(SeedService.name);

  constructor(
    private userRepository: UserBackofficeRepository,
    private userRolesBackoffice: UserRolesBackofficeRepository
  ) {
  }

  async seedDev() {
    this.logger.debug('Seeding Dev Environment!');

    const userRoles = [
      { role: FunctionTypeEnum.GERIR_FUNCOES, description: 'Gerir Funções' },
      { role: FunctionTypeEnum.PESQUISAS, description: 'Pesquisas' },
      { role: FunctionTypeEnum.SOLICITACAO_AJUDA, description: 'Solicitação de Ajuda' },
      { role: FunctionTypeEnum.GERIR_EMPRESAS, description: 'Gerir Empresas' },
      { role: FunctionTypeEnum.GERIR_AGENTE_PROMOTOR, description: 'Gerir Agente Promotor' },
      { role: FunctionTypeEnum.PROFISSIONAIS, description: 'Profissionais' },
      { role: FunctionTypeEnum.CONTROLE_DEMANDA, description: 'Controle de Demanda' },
      { role: FunctionTypeEnum.VISUALIZADOR, description: 'Visualizador' },
      { role: FunctionTypeEnum.CONTROLE_CONTRATO, description: 'Controle de Contrato' },
      { role: FunctionTypeEnum.GERIR_USUARIOS, description: 'Gerir Usuários' },
      { role: FunctionTypeEnum.GERIR_OBRAS, description: 'Gerir Obras' },
      { role: FunctionTypeEnum.INCONSISTENCIAS, description: 'Inconsistências' },
    ];
    
    await Promise.all(userRoles.map(async (role) => {
      await this.userRolesBackoffice.create({ ...role, active: true });
    }));

    const password = 'P@sw0rds';

    const allRoles = await this.userRolesBackoffice.findAll();


    const dataMINHA_CASA = {
      name: 'Admin MINHA_CASA',
      email: 'adminMINHA_CASA@admin.com',
      type: UserBackofficeTypeEnum.BACKOFFICE,
      password: await bcrypt.hash(password, 8),
      lastAccess: null,
      timeView: null,
      status: UserStatusEnum.ACTIVE,
      programType: UserProgramTypeEnum.MINHA_CASA,
      roles: allRoles
    };

    const dataREGMEL = {
      name: 'Admin REGMEL',
      email: 'adminREGMEL@admin.com',
      type: UserBackofficeTypeEnum.BACKOFFICE,
      password: await bcrypt.hash(password, 8),
      lastAccess: null,
      timeView: null,
      status: UserStatusEnum.ACTIVE,
      programType: UserProgramTypeEnum.REGMEL,
      roles: allRoles
    };



    await this.userRepository.create(dataMINHA_CASA);
    await this.userRepository.create(dataREGMEL);

    this.logger.debug(`Seed user created`);
  }
}
