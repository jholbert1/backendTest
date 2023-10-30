import { PartialType } from '@nestjs/swagger';
import { CreateUserBaseDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserBaseDto) {}
