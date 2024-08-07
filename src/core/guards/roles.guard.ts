import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { EmployeeRoleEnum } from "../../modules/data-interaction/database/enums/employee-role.enum";
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { UserRepository } from "../../modules/data-interaction/database/repositories/user/user.repository";
import { Roles } from "../decorators/roles.decorator";

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
      return false;
    }

    if (!user.employee) {
      return false;
    }

    if (user.employee.status !== "ACTIVE") {
      return false;
    }

    return user.employee.roles.some(role => roles.includes(role.role) && role.active);
  }
}
