import { SetMetadata } from '@nestjs/common';
import { RbacFuntionsEnum } from '../../enums/rbac-functions.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RbacFuntionsEnum[]) =>
    SetMetadata(ROLES_KEY, roles);
