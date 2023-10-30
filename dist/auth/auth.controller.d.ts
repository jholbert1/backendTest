import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    getProfile(user: User): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }>;
}
