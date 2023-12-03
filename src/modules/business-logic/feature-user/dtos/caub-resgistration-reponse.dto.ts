import { ApiProperty } from "@nestjs/swagger";

export class CaubRegistrationResponseDto {
    @ApiProperty()
    active: boolean;

    @ApiProperty()
    registered: boolean;
}