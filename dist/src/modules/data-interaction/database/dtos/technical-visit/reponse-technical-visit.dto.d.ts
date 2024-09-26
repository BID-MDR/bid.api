import { TechnicalVisitStatusEnum } from "../../enums/technical-visit-status.enum";
declare class UserEntityDto {
    id: number;
    name: string;
}
export declare class TechnicalVisitResponseDto {
    from: Date;
    to: Date;
    cancelReason: string;
    cancelledBy: UserEntityDto;
    rescheduledBy: UserEntityDto;
    professional: UserEntityDto;
    beneficiary: UserEntityDto;
    status: TechnicalVisitStatusEnum;
}
export {};
