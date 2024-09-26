import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../dtos/address/create-address.dto';
import { UpdateAddressDto } from '../dtos/address/update-address.dto';
import { AddressEntity } from '../entitites/address.entity';
export declare class AddressRepository extends BaseRepository<AddressEntity, CreateAddressDto, UpdateAddressDto> {
    private repository;
    constructor(repository: Repository<AddressEntity>);
    findAllByUserProfessionalInfoId(userProfessionalInfoId: string): Promise<AddressEntity[]>;
}
