import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly prisma;
    constructor(userService: UserService, jwtService: JwtService, prisma: PrismaService);
    validateUser(usernameOrEmail: string, pass: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: Omit<{
            id: number;
            firstName: string;
            lastName: string;
            username: string;
            email: string;
            password: string;
        }, "password">;
    }>;
    logout(user: User): Promise<void>;
}
