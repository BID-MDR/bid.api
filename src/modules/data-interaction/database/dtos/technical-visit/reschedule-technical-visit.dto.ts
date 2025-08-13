import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RescheduleTechnicalVisitDto{
   @ApiProperty()
    @Type(() => Date)
    from: Date;

    @ApiProperty({ required: false })
    @Type(() => Date)
    to?: Date;

    @ApiProperty()
    duration?: number;

    @ApiProperty()
    registerWorkId: string;
    
}
