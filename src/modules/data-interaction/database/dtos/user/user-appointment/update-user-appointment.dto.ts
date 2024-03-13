import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserAppointmentDto } from './create-user-appointment.dto';
import { IsUUID } from 'class-validator';

export class UpdateUserAppointmentDto extends OmitType(CreateUserAppointmentDto, ['type']) {
    @ApiProperty()
    @IsUUID()
    id!: string;
}
