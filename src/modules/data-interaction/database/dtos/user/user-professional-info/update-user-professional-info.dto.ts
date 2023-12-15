import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserProfessionalInfoDto } from './create-user-professional-info.dto';
import { IsUUID } from 'class-validator';

export class UpdateUserProfessionalInfoDto extends OmitType(PartialType(CreateUserProfessionalInfoDto), [
    'cauRegistrationNumber',
    'confeaRegistrationNumber',
]) {
    @ApiProperty()
    @IsUUID()
    id!: string;
}
