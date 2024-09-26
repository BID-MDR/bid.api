import { ResponseDto } from "src/core/dtos/response.dto";
import { AuthenticateRequestDto } from "./dto/authenticate-request.dto";
import { AuthenticateService } from "./authenticate.service";
export declare class AuthenticateController {
    private readonly _authenticateService;
    private readonly _logger;
    constructor(_authenticateService: AuthenticateService);
    authenticate(dto: AuthenticateRequestDto): Promise<ResponseDto<import("./dto/authenticate-response.dto").AuthenticateResponseDto>>;
}
