import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/core/repositories/base.repository";
import { Repository } from "typeorm";
import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { UpdateUserDto } from "../../dtos/user/update-user.dto";
import { UserEntity } from "../../entitites/user.entity";
import { UserTypeEnum } from "../../enums/user-type.enum";
import { UserProgramTypeEnum } from "../../enums/user-program-type.enum";
import { addMonths } from "date-fns";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, CreateUserDto, UpdateUserDto> {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
    super(repository);
  }

  async findByCpf(cpf: string) {
    return this.repository.findOne({ where: { cpf } });
  }

  async getById(_id: string) {
    return this.repository.findOne({
      where: { id: _id },
      relations: {
        companyAdministrator: true,
        employee: {
          company: true,
          roles: true,
        },
        beneficiaryUserInfo: true,
        technicalVisitsAsBeneficiary: true,
        technicalVisitsAsProfessional: true,
      },
    });
  }

  async getForGuard(_id: string) {
    return this.repository.findOne({
      where: { id: _id },
      relations: {
        companyAdministrator: true,
        employee: {
          company: true,
          roles: true,
        },
      },
    });
  }

  async updateUserProgramType(_id: string, programType: UserProgramTypeEnum) {
    return this.repository.update(_id, { programType });
  }

  async list() {
    return this.repository.find();
  }

  async listBeneficiary() {
    return this.repository.find({ where: {type: UserTypeEnum.BENEFICIARIO}});
  }

  async findMonth(month: number) {
    const now = new Date();
    const pastDate = addMonths(now, -month);


    return this.repository.createQueryBuilder('user')
    .where('user.type = :type',{ type:  UserTypeEnum.BENEFICIARIO})
    .andWhere('user.createdAt BETWEEN :pastDate AND :now', {
      pastDate: pastDate.toISOString(),
      now: now.toISOString(),
    })
    .getMany()


  }

  async getByCpf(cpf: string) {
    return this.repository.findOne({ where: { cpf } });
  }

  async getFirstBeneficiary() {
    return this.repository.findOne({
      order: {
        createdAt: "ASC",
      },
      where: {
        type: UserTypeEnum.BENEFICIARIO,
      },
    });
  }

  async getFirstProfessional() {
    return this.repository.findOne({
      order: {
        createdAt: "ASC",
      },
      where: {
        type: UserTypeEnum.PROFISSIONAL,
      },
    });
  }

  async updateProfilePicture(userId: string, pictureProfile: string) {
    return this.repository.update(
      {
        id: userId,
      },
      { profilePicture: pictureProfile }
    );
  }
  async getDashboardDataWithJoinBeneficiary(userId: string) {
    return await this.repository
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.beneficiaryUserInfo", "user-beneficiary-info")
      .leftJoinAndSelect("user.technicalVisitsAsBeneficiary", "technical-visit")
      .where("user.id = :userId", { userId })
      .getOne();
  }
  async getDashboardDataWithJoinProfessional(userId: string) {
    return await this.repository
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.userProfessionalInfo", "user-professional-info")
      .leftJoinAndSelect("user.technicalVisitsAsProfessional", "technical-visit")
      .where("user.id = :userId", { userId })
      .getOne();
  }

  async findNearbyEmployees(
    latitude: number,
    longitude: number,
    radiusInKm: number,
  ){
    const radiusInMeters = radiusInKm * 1000;

  
    const query = `
    SELECT u.*
    FROM user u
    INNER JOIN address a ON a.id = u.addressId
    WHERE u.type = 'PROFISSIONAL'
      AND ST_Distance_Sphere(
        point(a.longitude, a.latitude),
        point(?, ?)
      ) <= ?
  `;

  return this.repository.query(query, [longitude, latitude, radiusInMeters]);
  }

  async findNearbyBeneficiary(
    latitude: number,
    longitude: number,
    radiusInKm: number,
  ){
    const radiusInMeters = radiusInKm * 1000;

  
    const query = `
    SELECT u.*
    FROM user u
    INNER JOIN address a ON a.id = u.addressId
    WHERE u.type = 'BENEFICIARIO'
      AND ST_Distance_Sphere(
        point(a.longitude, a.latitude),
        point(?, ?)
      ) <= ?
  `;

  return this.repository.query(query, [longitude, latitude, radiusInMeters]);
  }
}
