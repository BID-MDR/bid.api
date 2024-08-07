import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { EmployeeRoleEnum } from "../../modules/data-interaction/database/enums/employee-role.enum";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { UserRepository } from "../../modules/data-interaction/database/repositories/user/user.repository";
import { Roles } from "../decorators/roles.decorator";
import { EmployeeStatusEnum } from "../../modules/data-interaction/database/enums/employee-status.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRepository: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<EmployeeRoleEnum[]>(Roles, context.getHandler());

    const request = context.switchToHttp().getRequest();
    const userId = (request.user as JwtPayloadInterface).userId;

    if (roles.length === 0) {
      return true;
    }
    const user = await this.userRepository.getForGuard(userId);

    if (user.companyAdministrator) {
      return true;
    }

    if (!user) {
      throw new UnauthorizedException('Requisição não autorizada.');
    }

    if (!user.employee) {
      throw new UnauthorizedException('Requisição não autorizada.');
    }

    if (user.employee.status !== EmployeeStatusEnum.ACTIVE) {
      throw new UnauthorizedException('Requisição não autorizada.');
    }

    return user.employee.roles.some(role => roles.includes(role.role) && role.active);
  }
}
