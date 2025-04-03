import { ApiProperty } from "@nestjs/swagger";
import { ConstructionsTypeEnum } from "../../enums/constructions-type.status";
import { IsEnum } from "class-validator";


export class UpdateRegisterWorkDto {
    @ApiProperty()
    registerWorkId?: string;

 
    @ApiProperty()
    area:number

    @ApiProperty()
    description?: string

     
    @ApiProperty({ enum: ConstructionsTypeEnum })
    @IsEnum(ConstructionsTypeEnum)
    type?: ConstructionsTypeEnum

}
