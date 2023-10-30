import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
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
    getProfile(): Promise<string>;
}
