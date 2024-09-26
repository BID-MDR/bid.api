import { CreateTechnicalVisitDto } from './create-technical-visit.dto';
import { TechnicalVisitStatusEnum } from '../../enums/technical-visit-status.enum';
declare const UpdateTechnicalVisitDto_base: import("@nestjs/common").Type<Pick<Partial<CreateTechnicalVisitDto>, "from" | "to">>;
export declare class UpdateTechnicalVisitDto extends UpdateTechnicalVisitDto_base {
    cancelReason: string;
    status: TechnicalVisitStatusEnum;
}
export {};
