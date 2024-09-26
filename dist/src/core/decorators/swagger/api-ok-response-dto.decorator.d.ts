import { Type } from '@nestjs/common';
export declare const ApiOkResponseDtoData: <DataDto extends Type<unknown>[] | Type<unknown> | null>({ type, description, isArray, status, }: {
    type: DataDto;
    description?: string;
    isArray?: boolean;
    status?: number;
}) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
