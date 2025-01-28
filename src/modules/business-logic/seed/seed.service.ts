import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/data-interaction/database/dtos/user/create-user.dto';
import { LevelOfEducationEnum } from 'src/modules/data-interaction/database/enums/level-of-education.enum';
import { MaritalStatusEnum } from 'src/modules/data-interaction/database/enums/marital-status.enum';
import { RaceEnum } from 'src/modules/data-interaction/database/enums/race.enum';
import { UserBirthGenderEnum } from 'src/modules/data-interaction/database/enums/user-birth-gender.enum';
import { UserGenderIdentityEnum } from 'src/modules/data-interaction/database/enums/user-gender-identity.enum';
import { UserMonthlyFamilyIncomeEnum } from 'src/modules/data-interaction/database/enums/user-monthly-family-income.enum';
import { UserProgramTypeEnum } from 'src/modules/data-interaction/database/enums/user-program-type.enum';
import { UserTypeEnum } from 'src/modules/data-interaction/database/enums/user-type.enum';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';

@Injectable()
export class SeedService {
    private logger = new Logger(SeedService.name);

    constructor(
      private userRepository: UserRepository
    ) {
    }

    async seedDev() {
        this.logger.debug('Seeding Dev Environment!');

        const password = 'Pasw0rds';

        const dataBeneficario:CreateUserDto = {
          name: 'Admin BENEFICIARIO',
          email: 'adminBENEFICIARIO@admin.com',
          cpf: '70693529059',
          programType:UserProgramTypeEnum.MINHA_CASA,
          password: await bcrypt.hash(password, 8),
          address: {
            state:'RS',
            street:'rua teste',
            city: 'POA',
            zipcode: '910420320',
            complement:'casa',
            neighborhood: 'seed teste',
            number: '01',
            latitude: '-11.1111',
            longitude:'-11.1111'
          },
          age: 22,
          birthDate: '1999-12-31',
          genderIdentity:UserGenderIdentityEnum.NAO_BINARIO,
          maritalStatus: MaritalStatusEnum.CASADO,
          race: RaceEnum.INDIGENA,
          type: UserTypeEnum.BENEFICIARIO,
          phone:'+5511999299999',
          birthGender: UserBirthGenderEnum.FEMININO,
          customGenderIdentity: 'menininho',
          levelOfEducation: LevelOfEducationEnum.DOUTORADO_INCOMPLETO,
          monthlyFamilyIncome: UserMonthlyFamilyIncomeEnum.DE_1_A_2_SALARIOS_MINIMOS
        };
        const dataPROFISSIONAL: CreateUserDto = {
          name: 'Admin PROFISSIONAL',
          email: 'adminPROFISSIONAL@admin.com',
          programType:UserProgramTypeEnum.REGMEL,
          cpf: '70693529052',
          password: await bcrypt.hash(password, 8),
          address: {
            state:'RS',
            street:'rua teste',
            city: 'POA',
            zipcode: '910420320',
            complement:'casa',
            neighborhood: 'seed teste',
            number: '01',
            latitude: '-11.1111',
            longitude:'-11.1111'
          },
          age: 22,
          birthDate: '1999-12-31',
          genderIdentity:UserGenderIdentityEnum.NAO_BINARIO,
          maritalStatus: MaritalStatusEnum.CASADO,
          race: RaceEnum.INDIGENA,
          type: UserTypeEnum.BENEFICIARIO,
          phone:'+5511999991999',
          birthGender: UserBirthGenderEnum.FEMININO,
          customGenderIdentity: 'menininho',
          levelOfEducation: LevelOfEducationEnum.DOUTORADO_INCOMPLETO,
          monthlyFamilyIncome: UserMonthlyFamilyIncomeEnum.DE_1_A_2_SALARIOS_MINIMOS
        };


        await this.userRepository.create(dataBeneficario);
          await this.userRepository.create(dataPROFISSIONAL);

        this.logger.debug(`Seed user created`);
    }
}
