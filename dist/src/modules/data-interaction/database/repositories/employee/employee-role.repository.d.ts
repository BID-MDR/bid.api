import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { EmployeeRoleEntity } from "../../entitites/employee-role.entity";
import { CreateEmployeeRoleDto } from "../../dtos/employee-role/employee-role-create.dto";
import { UpdateEmployeeRoleDto } from "../../dtos/employee-role/employee-active.dto";
export declare class EmployeeRoleRepository extends BaseRepository<EmployeeRoleEntity, CreateEmployeeRoleDto, UpdateEmployeeRoleDto> {
    private repository;
    constructor(repository: Repository<EmployeeRoleEntity>);
    updateRole(id: string, data: UpdateEmployeeRoleDto): Promise<void>;
}
