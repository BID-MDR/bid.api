import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserBeneficiaryInfoDto } from '../../dtos/user/user-beneficiary-info/create-user-beneficiary-info.dto';
import { UpdateUserBeneficiaryInfoDto } from '../../dtos/user/user-beneficiary-info/update-user-beneficiary-info.dto';
import { UserBeneficiaryInfoEntity } from '../../entitites/user-beneficiary-info.entity';
export declare class UserBeneficiaryInfoRepository extends BaseRepository<UserBeneficiaryInfoEntity, CreateUserBeneficiaryInfoDto, UpdateUserBeneficiaryInfoDto> {
    private repository;
    constructor(repository: Repository<UserBeneficiaryInfoEntity>);
}
