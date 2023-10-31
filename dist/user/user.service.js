"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const commons_1 = require("../commons");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOneByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findOneByUsername(username) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }
    async findByUsernameOrEmail(usernameOrEmail) {
        let user = await this.findOneByUsername(usernameOrEmail);
        if (!user) {
            user = await this.findOneByEmail(usernameOrEmail);
        }
        return user;
    }
    async create(createUserDto) {
        const checkEmail = await this.findOneByEmail(createUserDto.email);
        const checkUsername = await this.findOneByUsername(createUserDto.username);
        if (checkEmail) {
            throw new common_1.BadRequestException('Correo en uso', '6005');
        }
        if (checkUsername) {
            throw new common_1.BadRequestException('Username en uso', '6006');
        }
        try {
            const user = await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    password: bcrypt.hashSync(createUserDto.password, 10),
                },
            });
            return (0, commons_1.excludeFields)(user, ['password']);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error Registrando Usuario, ${error.message}`, '6001');
        }
    }
    async findAll(query) {
        try {
            const users = await this.prisma.user.findMany({
                take: query.perPage,
                skip: (query.page - 1) * query.perPage,
            });
            const totalUsers = await this.prisma.user.count();
            const usersWithoutPassword = users.map((user) => (0, commons_1.excludeFields)(user, ['password']));
            return {
                statusCode: 200,
                data: usersWithoutPassword,
                totalPages: Math.ceil(totalUsers / query.perPage),
                total: totalUsers,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error Mostrando Usuarios, ${error.message}`, '6002');
        }
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        return (0, commons_1.excludeFields)(user, ['password']);
    }
    async update(id, updateUserDto) {
        try {
            const user = await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            });
            return (0, commons_1.excludeFields)(user, ['password']);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error Actualizando Usuario, ${error.message}`, '6003');
        }
    }
    async remove(id) {
        await this.findOne(id);
        try {
            this.prisma.user.delete({
                where: { id },
            });
            return 'sucess';
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error Eliminando Usuario, ${error.message}`, '6004');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map