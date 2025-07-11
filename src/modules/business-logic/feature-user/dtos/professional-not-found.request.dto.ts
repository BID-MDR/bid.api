import { IsString } from 'class-validator';

export class ProfessionalNotFoundRequestDto {
  @IsString() neighborhood: string;
  @IsString() city: string;
  @IsString() state: string;
  @IsString() latitude: string;
  @IsString() longitude: string;
}
