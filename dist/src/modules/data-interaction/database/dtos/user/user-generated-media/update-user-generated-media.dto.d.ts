import { CreateUserGeneratedMediaDto } from './create-user-generated-media.dto';
declare const UpdateUserGeneratedMediaDto_base: import("@nestjs/common").Type<Partial<CreateUserGeneratedMediaDto>>;
export declare class UpdateUserGeneratedMediaDto extends UpdateUserGeneratedMediaDto_base {
    remove: boolean;
    id: string;
}
export {};
