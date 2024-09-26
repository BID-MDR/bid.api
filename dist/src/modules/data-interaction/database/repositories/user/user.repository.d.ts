import { BaseRepository } from "src/core/repositories/base.repository";
import { Repository } from "typeorm";
import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { UpdateUserDto } from "../../dtos/user/update-user.dto";
import { UserEntity } from "../../entitites/user.entity";
import { UserProgramTypeEnum } from "../../enums/user-program-type.enum";
export declare class UserRepository extends BaseRepository<UserEntity, CreateUserDto, UpdateUserDto> {
    private repository;
    constructor(repository: Repository<UserEntity>);
    findByCpf(cpf: string): Promise<UserEntity>;
    getById(_id: string): Promise<UserEntity>;
    getForGuard(_id: string): Promise<UserEntity>;
    updateUserProgramType(_id: string, programType: UserProgramTypeEnum): Promise<import("typeorm").UpdateResult>;
    list(): Promise<UserEntity[]>;
    listBeneficiary(): Promise<UserEntity[]>;
    findMonth(month: number): Promise<UserEntity[]>;
    getByCpf(cpf: string): Promise<UserEntity>;
    getFirstBeneficiary(): Promise<UserEntity>;
    getFirstProfessional(): Promise<UserEntity>;
    updateProfilePicture(userId: string, pictureProfile: string): Promise<import("typeorm").UpdateResult>;
    getDashboardDataWithJoinBeneficiary(userId: string): Promise<UserEntity>;
    getDashboardDataWithJoinProfessional(userId: string): Promise<UserEntity>;
}
