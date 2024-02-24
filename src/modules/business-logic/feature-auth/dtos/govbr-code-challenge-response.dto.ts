import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GovbrCodeChallengeResponseDto {
    @Expose({
        name: 'id',
    })
    @ApiProperty({ name: 'state' })
    state: string;

    @ApiProperty()
    @Expose()
    codeVerifier: string;
}
