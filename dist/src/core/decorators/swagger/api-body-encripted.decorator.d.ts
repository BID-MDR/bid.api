import { Type } from '@nestjs/common';
import { ApiBodyOptions } from '@nestjs/swagger';
type ApiBodyType = ApiBodyOptions & {
    type: Type<unknown>;
};
export declare const ApiBodyEncripted: (options: ApiBodyType) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
