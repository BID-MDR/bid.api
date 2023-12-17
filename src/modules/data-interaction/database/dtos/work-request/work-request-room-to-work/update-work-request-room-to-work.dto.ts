import { PartialType } from '@nestjs/swagger';
import { CreateWorkRequestRoomToWorkDto } from './create-work-request-room-to-work.dto';

export class UpdateWorkRequestRoomToWorkDto extends PartialType(CreateWorkRequestRoomToWorkDto) {}
