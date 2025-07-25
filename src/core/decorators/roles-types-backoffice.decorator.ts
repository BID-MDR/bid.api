import { Reflector } from '@nestjs/core';
import { UserBackofficeTypeEnum } from 'src/modules/backoffice/user/dto/userTypeEnum';

export const RolesTypesBackoffice = Reflector.createDecorator<UserBackofficeTypeEnum[]>();