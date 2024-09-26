"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateResponseDto = void 0;
class AuthenticateResponseDto {
    id;
    email;
    token;
    dateExpirated;
    constructor(id, email, token, dateExpirated) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.dateExpirated = dateExpirated;
    }
}
exports.AuthenticateResponseDto = AuthenticateResponseDto;
//# sourceMappingURL=authenticate-response.dto.js.map