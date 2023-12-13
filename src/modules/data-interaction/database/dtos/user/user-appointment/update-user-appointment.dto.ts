import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserAppointmentDto } from './create-user-appointment.dto';

export class UpdateUserAppointmentDto extends OmitType(CreateUserAppointmentDto, ['type']) {
    @ApiProperty()
    id!: string;
}
