import { Reflector } from '@nestjs/core';
import { FunctionTypeEnum } from 'src/modules/backoffice/user/dto/functionTypeEnum';

export const Roles = Reflector.createDecorator<FunctionTypeEnum[]>();