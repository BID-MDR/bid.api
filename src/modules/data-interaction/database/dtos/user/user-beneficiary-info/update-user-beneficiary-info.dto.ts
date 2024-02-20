import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserBeneficiaryInfoDto } from './create-user-beneficiary-info.dto';
import { IsUUID } from 'class-validator';

export class UpdateUserBeneficiaryInfoDto extends PartialType(CreateUserBeneficiaryInfoDto) {
    @ApiProperty()
    @IsUUID()
    id!: string;
}
