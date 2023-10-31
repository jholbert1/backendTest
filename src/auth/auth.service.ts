import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { excludeFields } from '../commons';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(usernameOrEmail: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsernameOrEmail(usernameOrEmail);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUsernameOrEmail(
      loginDto.userNameOrEmail,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };

    const sanitizedUser = excludeFields(user, ['password']);

    const access_token = this.jwtService.sign(payload);

    await this.prisma.authToken.create({
      data: {
        token: access_token,
        userId: user.id,
      },
    });

    return {
      access_token,
      user: sanitizedUser,
    };
  }

  async logout(user: User) {
    try {
      await this.prisma.authToken.deleteMany({
        where: {
          userId: user.id,
        },
      });
    } catch (error) {
      throw new BadRequestException('Error al cerrar session', error);
    }
  }
}
