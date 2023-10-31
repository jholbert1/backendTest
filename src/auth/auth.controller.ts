import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ResponseStatusCode } from '../commons/decorators';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ResponseStatusCode()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @ResponseStatusCode()
  async logout(@GetUser() user: User) {
    return this.authService.logout(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Authentication User' })
  @ApiBearerAuth()
  @ResponseStatusCode()
  async getProfile(@GetUser() user: User) {
    return user;
  }
}
