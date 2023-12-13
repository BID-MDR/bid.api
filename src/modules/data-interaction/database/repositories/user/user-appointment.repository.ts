import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserAppointmentDto } from '../../dtos/user/user-appointment/create-user-appointment.dto';
import { UpdateUserAppointmentDto } from '../../dtos/user/user-appointment/update-user-appointment.dto';
import { UserAppointmentEntity } from '../../entitites/user-appointment.entity';

@Injectable()
export class UserAppointmentRepository extends BaseRepository<
    UserAppointmentEntity,
    CreateUserAppointmentDto,
    UpdateUserAppointmentDto
> {
    constructor(@InjectRepository(UserAppointmentEntity) private repository: Repository<UserAppointmentEntity>) {
        super(repository);
    }

    async areDatesWithinAnyAppointment(specificDates: Date[]): Promise<boolean> {
        const query = this.repository.createQueryBuilder('appointment');

        specificDates.forEach((date, index) => {
            if (index === 0) {
                query.where(':specificDate BETWEEN appointment.from AND appointment.to', { specificDate: date });
            } else {
                query.orWhere(':specificDate BETWEEN appointment.from AND appointment.to', { specificDate: date });
            }
        });

        const count = await query.getCount();
        return count > 0;
    }
}
