import { IsUUID } from 'class-validator';

export class GetSsoRequestDto {
    @IsUUID()
    id: string;
}
