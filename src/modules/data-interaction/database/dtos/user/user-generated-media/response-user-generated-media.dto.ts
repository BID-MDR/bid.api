import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class ResponseUserGeneratedMediaDto {
  @ApiProperty()
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty()
  @Expose()
  @Type(() => String)
  url: string;

  @ApiProperty()
  @Expose()
  @Type(() => String)
  type: string;
}
