import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return 'hello users';
  }
}
