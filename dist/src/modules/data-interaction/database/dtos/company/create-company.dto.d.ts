import { CreateAddressDto } from '../address/create-address.dto';
import { CompanyStatusEnum } from '../../enums/company-status.enum';
import { UserEntity } from '../../entitites/user.entity';
import { EmployeeEntity } from '../../entitites/employee.entity';
export declare class CreateCompanyDto {
    name: string;
    cnpj: string;
    ownerCpf: string;
    status: CompanyStatusEnum;
    addresses: CreateAddressDto;
    userAdmin: UserEntity;
    employees?: EmployeeEntity[];
}
