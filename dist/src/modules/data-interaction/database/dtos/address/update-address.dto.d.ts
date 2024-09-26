import { CreateAddressDto } from './create-address.dto';
declare const UpdateAddressDto_base: import("@nestjs/common").Type<Partial<CreateAddressDto>>;
export declare class UpdateAddressDto extends UpdateAddressDto_base {
    id: string;
    state: string;
    nickname?: string;
    city: string;
    zipcode: string;
    complement: string;
    neighborhood: string;
    number: string;
    street: string;
    latitude: string;
    longitude: string;
    maximumDistanceToWorks?: number;
}
export {};
