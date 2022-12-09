import { UsersService } from './users.service';
import { CreateUserDto } from './../news/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly usersSevice: UsersService) {}
    @Post()
    async create(@Body() user: CreateUserDto) {
        return this.usersSevice.create(user)
    }
}
