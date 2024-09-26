import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ParseToClassPipe implements PipeTransform<any, any> {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
