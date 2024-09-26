import { CreateRoomSolutionDto } from './create-room-solution.dto';
declare const UpdateRoomSolutionDto_base: import("@nestjs/common").Type<Partial<Omit<CreateRoomSolutionDto, "solution">>>;
export declare class UpdateRoomSolutionDto extends UpdateRoomSolutionDto_base {
    id: string;
}
export {};
