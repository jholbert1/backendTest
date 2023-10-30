import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { PASSWORD_ERROR_MESSAGE, PASSWORD_PATTERN } from '../users.constans';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @ApiProperty({ required: true, default: 'testUser@yopmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: PASSWORD_ERROR_MESSAGE })
  @IsNotEmpty()
  @Matches(PASSWORD_PATTERN, {
    message: PASSWORD_ERROR_MESSAGE,
  })
  password: string;
}
