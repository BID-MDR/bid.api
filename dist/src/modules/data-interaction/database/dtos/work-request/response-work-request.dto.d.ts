import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { RoomResponseDto } from "../room/reponse-room.dto";
declare class ResponseWelfare {
    welfareProgram: string;
}
export declare class ResponseWorkRequestDto extends BaseResponseDto {
    description: string;
    resident: number;
    responsiblePersonName: string;
    kinship: string;
    propertyType: string;
    flooring: string;
    prevailingConstructionMaterials: string;
    status: string;
    room: RoomResponseDto[];
    welfare: ResponseWelfare[];
}
export {};
