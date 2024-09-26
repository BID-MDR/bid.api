import { ModuleRef } from '@nestjs/core';
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class ExistsInDBConstraint implements ValidatorConstraintInterface {
    private _moduleRef;
    constructor(_moduleRef: ModuleRef);
    validate(propValue: string | string[], args: ValidationArguments): Promise<boolean>;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
export declare function ExistsInDB(entityRepository: new (...args: any[]) => {
    getById: (id: string) => any;
    listByIds: (ids: string[]) => any;
}, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
