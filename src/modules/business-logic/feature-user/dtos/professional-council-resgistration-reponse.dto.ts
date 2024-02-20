import { ApiProperty } from "@nestjs/swagger";

export class ProfessionalCouncilRegistrationResponseDto {
    @ApiProperty()
    active: boolean;

    @ApiProperty()
    registered: boolean;

    @ApiProperty()
    registryNumber: string;
}