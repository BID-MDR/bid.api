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
exports.ExistsInDBConstraint = void 0;
exports.ExistsInDB = ExistsInDB;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
let ExistsInDBConstraint = class ExistsInDBConstraint {
    _moduleRef;
    constructor(_moduleRef) {
        this._moduleRef = _moduleRef;
    }
    async validate(propValue, args) {
        const moduleRef = this._moduleRef.get(args.constraints[0], {
            strict: false,
        });
        if (Array.isArray(propValue)) {
            propValue = propValue.filter((el) => (0, class_validator_1.isMongoId)(el));
            if (propValue.length === 0) {
                return false;
            }
            const documents = await moduleRef.listByIds(propValue);
            if (documents.length !== propValue.length) {
                return false;
            }
        }
        else {
            if (!(0, class_validator_1.isMongoId)(propValue)) {
                return false;
            }
            const document = await moduleRef.getById(propValue);
            if (!document) {
                return false;
            }
        }
        return true;
    }
    defaultMessage(validationArguments) {
        return `O id ${validationArguments?.value} não está cadastrado no banco!`;
    }
};
exports.ExistsInDBConstraint = ExistsInDBConstraint;
exports.ExistsInDBConstraint = ExistsInDBConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], ExistsInDBConstraint);
function ExistsInDB(entityRepository, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entityRepository],
            validator: ExistsInDBConstraint,
        });
    };
}
//# sourceMappingURL=exists-in-db.validator.js.map