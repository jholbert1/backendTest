import { UserService } from '../user/user.service';
export declare class SeedService {
    private readonly usersService;
    constructor(usersService: UserService);
    seedUser(): Promise<Omit<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }, "password">>;
}
