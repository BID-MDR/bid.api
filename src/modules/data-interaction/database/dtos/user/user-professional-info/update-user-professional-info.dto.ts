import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserProfessionalInfoDto } from './create-user-professional-info.dto';

export class UpdateUserProfessionalInfoDto extends OmitType(PartialType(CreateUserProfessionalInfoDto), [
    'cauRegistrationNumber',
    'confeaRegistrationNumber',
]) {
    @ApiProperty()
    id!: string;
}
