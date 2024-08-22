import { Reflector } from '@nestjs/core';
import { EmployeeRoleEnum } from '../../modules/data-interaction/database/enums/employee-role.enum';

export const Roles = Reflector.createDecorator<EmployeeRoleEnum[]>();