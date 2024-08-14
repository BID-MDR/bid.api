import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FunctionTypeEnum } from "src/modules/backoffice/user/dto/functionTypeEnum";
import { UserBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user.repository";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { Roles } from "../decorators/roles-backoffice.decorator";

@Injectable()
export class RolesBackofficeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRepository: UserBackofficeRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<FunctionTypeEnum[]>(Roles, context.getHandler());

    const request = context.switchToHttp().getRequest();
    const userId = (request.user as JwtPayloadInterface).userId;

    if (roles.length === 0) {
      return true;
    }
    const user = await this.userRepository.getForGuard(userId);

    if (!user) {
      throw new UnauthorizedException('Requisição não autorizada.');
    }

    return user.roles.some(role => roles.includes(role.role) && role.active);
  }
}
