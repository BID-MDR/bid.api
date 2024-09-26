import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRepository } from "../../modules/data-interaction/database/repositories/user/user.repository";
export declare class RolesGuard implements CanActivate {
    private reflector;
    private userRepository;
    constructor(reflector: Reflector, userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
