import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import {
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_PATTERN,
} from '../../user/users.constans';

export class LoginDto {
  @ApiProperty({ default: 'testUser@yopmail.com' })
  @IsNotEmpty()
  userNameOrEmail: string;

  @ApiProperty({ description: PASSWORD_ERROR_MESSAGE, default: 'Abc12*' })
  @IsNotEmpty()
  @Matches(PASSWORD_PATTERN, {
    message: PASSWORD_ERROR_MESSAGE,
  })
  password: string;
}
