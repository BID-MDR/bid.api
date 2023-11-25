import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ParseToClassPipe implements PipeTransform<any, any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        return plainToInstance(metadata.metatype, value);
    }
}
