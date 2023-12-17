import { PartialType } from '@nestjs/swagger';
import { CreateWorkRequestPrecarityDto } from './create-work-request-precarity.dto';

export class UpdateWorkRequestPrecarityDto extends PartialType(CreateWorkRequestPrecarityDto) {}
