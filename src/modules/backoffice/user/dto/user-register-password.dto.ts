import { ApiProperty } from "@nestjs/swagger";

export abstract class UserRegisterPasswordDto {
    @ApiProperty({ type: String })
    password: string;
  }