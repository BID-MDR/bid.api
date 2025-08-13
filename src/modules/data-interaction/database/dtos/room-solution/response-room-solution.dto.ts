import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { ResponseUserGeneratedMediaDto } from "../user/user-generated-media/response-user-generated-media.dto";

@Exclude()
export class ResponseRoomSolutionDto {
  @ApiProperty()
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty()
  @Expose()
  @Type(() => String)
  solution: string;

  @ApiProperty({ type: () => ResponseUserGeneratedMediaDto, isArray: true })
  @Expose()
  @Type(() => ResponseUserGeneratedMediaDto)
  picturesAndVideos: ResponseUserGeneratedMediaDto[];

  @ApiProperty({ type: () => ResponseUserGeneratedMediaDto, isArray: true })
  @Expose()
  @Type(() => ResponseUserGeneratedMediaDto)
  picturesAndVideosConclusion: ResponseUserGeneratedMediaDto[];
}
