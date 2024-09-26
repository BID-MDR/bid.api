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
exports.CreateWorkRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const kinship_enum_1 = require("../../enums/kinship.enum");
const property_type_enum_1 = require("../../enums/property-type.enum");
const flooring_enum_1 = require("../../enums/flooring.enum");
const prevailing_construction_materials_enum_1 = require("../../enums/prevailing-construction-materials.enum");
const class_transformer_1 = require("class-transformer");
const welfare_program_enum_1 = require("../../enums/welfare-program.enum");
const create_room_dto_1 = require("../room/create-room.dto");
class CreateWorkRequestWelfareProgramDto {
    welfareProgram;
}
__decorate([
    (0, swagger_1.ApiProperty)({ enum: welfare_program_enum_1.WelfareProgramEnum }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(welfare_program_enum_1.WelfareProgramEnum),
    __metadata("design:type", String)
], CreateWorkRequestWelfareProgramDto.prototype, "welfareProgram", void 0);
class CreateWorkRequestDto {
    demandId;
    demand;
    description;
    responsiblePersonName;
    resident;
    kinship;
    propertyType;
    flooring;
    prevailingConstructionMaterials;
    welfare;
    room;
}
exports.CreateWorkRequestDto = CreateWorkRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateWorkRequestDto.prototype, "demandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkRequestDto.prototype, "responsiblePersonName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(10),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateWorkRequestDto.prototype, "resident", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(kinship_enum_1.KinshipEnum),
    __metadata("design:type", String)
], CreateWorkRequestDto.prototype, "kinship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(property_type_enum_1.PropertyTypeEnum),
    __metadata("design:type", String)
], CreateWorkRequestDto.prototype, "propertyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(flooring_enum_1.FlooringEnum),
    __metadata("design:type", String)
], CreateWorkRequestDto.prototype, "flooring", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(prevailing_construction_materials_enum_1.PrevalingConstructionMaterialsEnum),
    __metadata("design:type", String)
], CreateWorkRequestDto.prototype, "prevailingConstructionMaterials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreateWorkRequestWelfareProgramDto, isArray: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateWorkRequestWelfareProgramDto),
    __metadata("design:type", Array)
], CreateWorkRequestDto.prototype, "welfare", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: create_room_dto_1.CreateRoomDto, isArray: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_room_dto_1.CreateRoomDto),
    __metadata("design:type", Array)
], CreateWorkRequestDto.prototype, "room", void 0);
//# sourceMappingURL=create-work-request.dto.js.map