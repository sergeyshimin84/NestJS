import { CreateUserDto } from './dtos/user-news-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { Repository } from 'typeorm';
import { hash } from '../utils/crypto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
    ) {}

    async create(user: CreateUserDto) {
        const userEntity = new UsersEntity();
        userEntity.firstName = user.firstName;
        userEntity.email = user.email;
        userEntity.roles = user.roles;
        userEntity.password = await hash(user.password);

        return this.usersRepository.save(userEntity)
    }

    async findById(id: number) {
        return this.usersRepository.findOne(id);
    }

    async findByEmail(email): Promise<UsersEntity> {
        return this.usersRepository.findOne({email});
    }
}
