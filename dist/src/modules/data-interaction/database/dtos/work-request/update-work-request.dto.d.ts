import { FlooringEnum } from "../../enums/flooring.enum";
import { KinshipEnum } from "../../enums/kinship.enum";
import { PropertyTypeEnum } from "../../enums/property-type.enum";
export declare class UpdateWorkRequestDto {
    description: string;
    resident: number;
    kinship: KinshipEnum;
    propertyType: PropertyTypeEnum;
    flooring: FlooringEnum;
}
