"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseToClassPipe = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
let ParseToClassPipe = class ParseToClassPipe {
    async transform(value, metadata) {
        return (0, class_transformer_1.plainToInstance)(metadata.metatype, value);
    }
};
exports.ParseToClassPipe = ParseToClassPipe;
exports.ParseToClassPipe = ParseToClassPipe = __decorate([
    (0, common_1.Injectable)()
], ParseToClassPipe);
//# sourceMappingURL=class-trasnformer.pipe.js.map