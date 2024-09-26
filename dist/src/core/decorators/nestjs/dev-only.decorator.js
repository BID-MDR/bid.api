"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevOnlyRoute = exports.DEV_ONLY_ROUTE_DECORATOR_KEY = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dev_only_guard_1 = require("../../guards/dev-only.guard");
exports.DEV_ONLY_ROUTE_DECORATOR_KEY = 'decorator:dev-only-route';
const DevOnlyRoute = () => (0, common_1.applyDecorators)((0, common_1.UseGuards)(dev_only_guard_1.DevOnlyGuard), (0, common_1.SetMetadata)(exports.DEV_ONLY_ROUTE_DECORATOR_KEY, true), (0, swagger_1.ApiExcludeEndpoint)(process.env.NODE_ENV === 'production'));
exports.DevOnlyRoute = DevOnlyRoute;
//# sourceMappingURL=dev-only.decorator.js.map