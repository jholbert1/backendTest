import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService, configService: ConfigService);
    validate(payload: any): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }>;
}
export {};
