import { PartialType } from '@nestjs/swagger';
import { CreateWorkRequestWelfareProgramDto } from './create-work-request-welfare-program.dto';

export class UpdateWorkRequestWelfareProgramDto extends PartialType(CreateWorkRequestWelfareProgramDto) {}
