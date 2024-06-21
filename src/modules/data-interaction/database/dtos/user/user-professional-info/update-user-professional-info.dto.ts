import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateUserProfessionalInfoDto } from './create-user-professional-info.dto';

export class UpdateUserProfessionalInfoDto extends OmitType(PartialType(CreateUserProfessionalInfoDto), [
    'cauRegistrationNumber',
    'confeaRegistrationNumber',
]) {
    @ApiProperty()
    @IsUUID()
    id!: string;
}
