import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { UserBackofficeEntity } from 'src/modules/data-interaction/database/entitites/user-backoffice.entity';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
import { UserProgramTypeEnum } from 'src/modules/data-interaction/database/enums/user-program-type.enum';

export class MessageBackofficeRegisterRequestDto {
    @ApiProperty()
    @Length(1, 500)
    content: string;

    @ApiProperty()
    @Length(3, 100)
    identifier: string;

    senderBackoffice: UserBackofficeEntity;

    receiverBackoffice: UserBackofficeEntity;

    sender: UserEntity;

    receiver: UserEntity;


    @ApiProperty({ enum: UserProgramTypeEnum })
    @IsEnum(UserProgramTypeEnum)
    programType: UserProgramTypeEnum;

    client1?: string
    client2?: string

}
