import { RoomTypeEnum } from "../../enums/room-type.enum";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
export declare class CreateRoomDto {
    name: string;
    type: RoomTypeEnum;
    workRequest?: WorkRequestEntity;
}
