import { UserRatingTypeEnum } from '../../../enums/user-rating-type.enum';
export declare class CreateUserRatingDto {
    professionalId: string;
    beneficiaryId: string;
    profesisonalInterationRating: number;
    programRating: number;
    platformRating: number;
    type: UserRatingTypeEnum;
}
