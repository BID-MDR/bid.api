import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserBeneficiaryInfoDto } from './create-user-beneficiary-info.dto';

export class UpdateUserBeneficiaryInfoDto extends PartialType(CreateUserBeneficiaryInfoDto) {
    @ApiProperty()
    id!: string;
}
