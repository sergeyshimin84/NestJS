import { CreateUserDto } from './dtos/user-news-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
    ) {}

    async create(user: CreateUserDto) {
        const userEntity = new UsersEntity();
        userEntity.firstName = user.firstName;

        return this.usersRepository.save(userEntity)
    }
}
