import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserAppointmentDto } from '../../dtos/user/user-appointment/create-user-appointment.dto';
import { UpdateUserAppointmentDto } from '../../dtos/user/user-appointment/update-user-appointment.dto';
import { UserAppointmentEntity } from '../../entitites/user-appointment.entity';
export declare class UserAppointmentRepository extends BaseRepository<UserAppointmentEntity, CreateUserAppointmentDto, UpdateUserAppointmentDto> {
    private repository;
    constructor(repository: Repository<UserAppointmentEntity>);
    listByUserId(userId: string): Promise<UserAppointmentEntity[]>;
    areDatesWithinAnyAppointment(specificDates: Date[]): Promise<boolean>;
}
