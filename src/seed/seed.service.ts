import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class SeedService {
  constructor(private readonly usersService: UserService) {}

  async seedUser() {
    const user = {
      firstName: 'Test',
      lastName: 'User',
      username: 'testUser',
      email: 'testUser@yopmail.com',
      password: 'Abc12*',
    };

    return await this.usersService.create(user);
  }
}
