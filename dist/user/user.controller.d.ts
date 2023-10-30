import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UserPaginationDto } from './dto/user-pagination.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<Omit<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }, "password">>;
    findAll(query: UserPaginationDto): Promise<{
        statusCode: number;
        data: Omit<{
            id: number;
            firstName: string;
            lastName: string;
            username: string;
            email: string;
            password: string;
        }, "password">[];
        totalPages: number;
        total: number;
    }>;
    findOne(id: string): Promise<Omit<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }, "password">>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }, "password">>;
    remove(id: string): Promise<string>;
}
