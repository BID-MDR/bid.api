import { ResponseDto } from "src/core/dtos/response.dto";
import { FeatureAuthService } from "src/modules/business-logic/feature-auth/feature-auth.service";
import { UserService } from "src/modules/backoffice/user/user.service";
import { CreateUserBackofficeDto } from "./dto/create-user-backoffice.dto";
import { UserRegisterPasswordDto } from "./dto/user-register-password.dto";
export declare class UserBackofficeController {
    private UserService;
    private featureAuthService;
    private readonly _logger;
    constructor(UserService: UserService, featureAuthService: FeatureAuthService);
    getUsers(): Promise<ResponseDto<import("../../data-interaction/database/entitites/user-backoffice.entity").UserBackofficeEntity[]>>;
    getUser(id: string): Promise<ResponseDto<import("../../data-interaction/database/entitites/user-backoffice.entity").UserBackofficeEntity>>;
    getUserEmail(email: string): Promise<ResponseDto<import("../../data-interaction/database/entitites/user-backoffice.entity").UserBackofficeEntity>>;
    getAuthenticated(request: any): Promise<ResponseDto<import("../../data-interaction/database/entitites/user-backoffice.entity").UserBackofficeEntity>>;
    create(body: CreateUserBackofficeDto): Promise<any>;
    firstAccess(_id: string, dto: UserRegisterPasswordDto): Promise<ResponseDto<any>>;
    update(id: string, body: CreateUserBackofficeDto): Promise<any>;
    delete(id: string): Promise<void>;
}
