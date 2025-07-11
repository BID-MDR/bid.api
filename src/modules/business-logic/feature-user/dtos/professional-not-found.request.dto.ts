import { IsNumber, IsString } from 'class-validator';

export class ProfessionalNotFoundRequestDto {
  @IsString() neighborhood: string;
  @IsString() city: string;
  @IsString() state: string;
  @IsNumber() latitude: number;
  @IsNumber() longitude: number;
}
