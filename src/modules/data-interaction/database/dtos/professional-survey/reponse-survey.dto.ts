import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { TechnicalVisitStatusEnum } from "../../enums/technical-visit-status.enum";
import { SurveyStatusEnum } from "../../enums/survey-status.enum";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { TechnicalVisitEntity } from "../../entitites/technical-visit.entity";
import { RoomEntity } from "../../entitites/room.entity";
import { UserGeneratedMediaEntity } from "../../entitites/user-generated-media.entity";

@Exclude()
class UserEntityDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;
}

export class SurveyResponseDto {

    @ApiProperty({ type: UserEntityDto })
    professional: UserEntityDto;

    @ApiProperty({ type: UserEntityDto })
    beneficiary: UserEntityDto;

    @ApiProperty()
    state: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    zipcode: string;

    @ApiProperty()
    complement: string;

    @ApiProperty()
    neighborhood: string;

    @ApiProperty()
    number: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    latitude: string;

    @ApiProperty()
    longitude: string;

    @ApiProperty()
    status: SurveyStatusEnum;

    @ApiProperty()
    conclusionDate: Date;

    @ApiProperty()
    workRequest?: WorkRequestEntity;

    @ApiProperty()
    technicalVisit?: TechnicalVisitEntity;

    @ApiProperty()
    howManyPeopleLive: number;

    @ApiProperty()
    responsible: string;

    @ApiProperty()
    benefits: string;

    @ApiProperty()
    living: string;

    @ApiProperty()
    houseType: string;

    @ApiProperty()
    flooring: string;

    @ApiProperty()
    houseBuilt: string;

    @ApiProperty({ type: [RoomEntity] })
    rooms: RoomEntity[];

    @ApiProperty({ type: [RoomEntity] })
    improveRooms: RoomEntity[];

    @ApiProperty()
    problems: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: [UserGeneratedMediaEntity] })
    photos?: UserGeneratedMediaEntity[];
}
