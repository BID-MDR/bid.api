import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user.repository";
import { AuthenticateRequestDto } from "./dto/authenticate-request.dto";
import { AuthenticateResponseDto } from "./dto/authenticate-response.dto";
export declare class AuthenticateService {
    private readonly _userRepository;
    private readonly _configService;
    private readonly _jwtService;
    constructor(_userRepository: UserBackofficeRepository, _configService: ConfigService, _jwtService: JwtService);
    private validate;
    authenticate(dto: AuthenticateRequestDto): Promise<AuthenticateResponseDto>;
    private _createToken;
}
