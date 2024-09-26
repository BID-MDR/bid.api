import { UserEntity } from "../../entitites/user.entity";
import { EmployeeRoleEntity } from "../../entitites/employee-role.entity";
export declare class EmployeeRegisterRequestDto {
    companyId: string;
    roles: EmployeeRoleEntity[];
    user: UserEntity;
}
