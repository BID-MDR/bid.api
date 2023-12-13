import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../dtos/address/create-address.dto';
import { UpdateAddressDto } from '../dtos/address/update-address.dto';
import { AddressEntity } from '../entitites/address.entity';

@Injectable()
export class AddressRepository extends BaseRepository<AddressEntity, CreateAddressDto, UpdateAddressDto> {
    constructor(@InjectRepository(AddressEntity) private repository: Repository<AddressEntity>) {
        super(repository);
    }
}
