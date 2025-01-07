import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FunctionTypeEnum } from "src/modules/backoffice/user/dto/functionTypeEnum";
import { Roles } from "../decorators/roles-backoffice.decorator";
import { JwtPayloadBackoffice } from "../interfaces/jwt-payload-backoffice.interface";

@Injectable()
export class RolesBackofficeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<FunctionTypeEnum[]>(Roles, context.getHandler());

    const request = context.switchToHttp().getRequest();
    const user = (request.user as JwtPayloadBackoffice);

    if (roles.length === 0) {
      return true;
    }

    if (!user) {
      throw new UnauthorizedException('Requisição não autorizada. 1');
    }

    return user.roles.some(role => roles.includes(role.role) && role.active);
  }
}
