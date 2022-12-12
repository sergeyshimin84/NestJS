import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { UsersService } from './users.service';
import { CreateUserDto } from './../users/dtos/create-user.dto';
import { Body, Controller, Post, Get, Render, UseGuards, Patch, Req } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { get } from 'http';
import { EditUserDto } from './dtos/edit-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersSevice: UsersService,
        private readonly authService: AuthService,
    ) {}
    
    @Post()
    async create(@Body() user: CreateUserDto) {
        return this.usersSevice.create(user)
    }

    @Get('edit-profile/:id')
    @Render('user/edit-profile')
    async renderEditProfile(@Param('id', ParseIntPipe) id: number, @Req() req) {
        const _user = await this.usersSevice.findById(id);
        if (!_user) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Неверный идентификатор пользователя',
                },
                HttpStatus.FORBIDDEN,
            );
        }
        return _user;
    }

    @Patch('api')
    @UseGuards(JwtAuthGuard)
    async edit(@Body() user: EditUserDto, @Req() req) {
        const jwtUserId = req.user.userId;
        return this.usersSevice.edit(jwtUserId, user);
    }
}
