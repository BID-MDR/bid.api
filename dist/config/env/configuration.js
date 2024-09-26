"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: parseInt(process.env.PORT, 10) || 4001,
    ENABLE_CORS: process.env.ENABLE_CORS || true,
    ENABLE_DOCS: process.env.ENABLE_DOCS || true,
});
exports.configuration = configuration;
//# sourceMappingURL=configuration.js.map