"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevOnlyGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const dev_only_decorator_1 = require("../decorators/nestjs/dev-only.decorator");
let DevOnlyGuard = class DevOnlyGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const isDevOnlyRoute = this.reflector.get(dev_only_decorator_1.DEV_ONLY_ROUTE_DECORATOR_KEY, context.getHandler());
        if (isDevOnlyRoute && process.env.NODE_ENV === 'production')
            throw new common_1.NotFoundException();
        return true;
    }
};
exports.DevOnlyGuard = DevOnlyGuard;
exports.DevOnlyGuard = DevOnlyGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], DevOnlyGuard);
//# sourceMappingURL=dev-only.guard.js.map