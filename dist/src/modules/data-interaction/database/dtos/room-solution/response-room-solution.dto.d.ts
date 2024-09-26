import { ResponseUserGeneratedMediaDto } from "../user/user-generated-media/response-user-generated-media.dto";
export declare class ResponseRoomSolutionDto {
    id: string;
    solution: string;
    picturesAndVideos: ResponseUserGeneratedMediaDto[];
}
