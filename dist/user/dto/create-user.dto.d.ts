export declare class CreateUserBaseDto {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}
export declare class CreateUserDto extends CreateUserBaseDto {
    password: string;
}
