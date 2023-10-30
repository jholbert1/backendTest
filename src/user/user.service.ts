import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { excludeFields } from '../commons';
import { UserPaginationDto } from './dto/user-pagination.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.findOneByEmail(createUserDto.email);
    const checkUsername = await this.findOneByUsername(createUserDto.username);

    if (checkEmail) {
      throw new BadRequestException('Correo en uso', '6005');
    }

    if (checkUsername) {
      throw new BadRequestException('Username en uso', '6006');
    }

    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: bcrypt.hashSync(createUserDto.password, 10),
        },
      });

      return excludeFields(user, ['password']);
    } catch (error) {
      throw new BadRequestException(
        `Error Registrando Usuario, ${error.message}`,
        '6001',
      );
    }
  }

  async findAll(query: UserPaginationDto) {
    try {
      const users = await this.prisma.user.findMany({
        take: query.perPage,
        skip: (query.page - 1) * query.perPage,
      });

      const totalUsers = await this.prisma.user.count();

      const usersWithoutPassword = users.map((user) =>
        excludeFields(user, ['password']),
      );

      return {
        statusCode: 200,
        data: usersWithoutPassword,
        totalPages: Math.ceil(totalUsers / query.perPage),
        total: totalUsers,
      };
    } catch (error) {
      throw new BadRequestException(
        `Error Mostrando Usuarios, ${error.message}`,
        '6002',
      );
    }
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return excludeFields(user, ['password']);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return excludeFields(user, ['password']);
    } catch (error) {
      throw new BadRequestException(
        `Error Actualizando Usuario, ${error.message}`,
        '6003',
      );
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      this.prisma.user.delete({
        where: { id },
      });
      return 'sucess';
    } catch (error) {
      throw new BadRequestException(
        `Error Eliminando Usuario, ${error.message}`,
        '6003',
      );
    }
  }
}
