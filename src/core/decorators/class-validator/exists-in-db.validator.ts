import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    isMongoId,
    registerDecorator,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class ExistsInDBConstraint implements ValidatorConstraintInterface {
    constructor(private _moduleRef: ModuleRef) {}

    async validate(propValue: string | string[], args: ValidationArguments) {
        const moduleRef = this._moduleRef.get(args.constraints[0], {
            strict: false,
        });
        if (Array.isArray(propValue)) {
            propValue = propValue.filter((el) => isMongoId(el));
            if (propValue.length === 0) {
                return false;
            }

            const documents = await moduleRef.listByIds(propValue);

            if (documents.length !== propValue.length) {
                return false;
            }
        } else {
            if (!isMongoId(propValue)) {
                return false;
            }

            const document = await moduleRef.getById(propValue);

            if (!document) {
                return false;
            }
        }

        return true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `O id ${validationArguments?.value} não está cadastrado no banco!`;
    }
}

export function ExistsInDB(
    entityRepository: new (...args: any[]) => {
        getById: (id: string) => any;
        listByIds: (ids: string[]) => any;
    },
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entityRepository],
            validator: ExistsInDBConstraint,
        });
    };
}
