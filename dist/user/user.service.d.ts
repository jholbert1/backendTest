import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPaginationDto } from './dto/user-pagination.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOneByEmail(email: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }>;
    findOneByUsername(username: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }>;
    findByUsernameOrEmail(usernameOrEmail: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }>;
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
    findOne(id: number): Promise<Omit<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }, "password">>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<{
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }, "password">>;
    remove(id: number): Promise<string>;
}
