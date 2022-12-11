import { CreateUserDto } from './dtos/user-news-dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { Repository } from 'typeorm';
import { hash } from '../utils/crypto';
import { EditUserDto } from './dtos/edit-user.dto';
import { checkPermission } from 'src/utils/check-permission';

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

    async edit(id: number, user: EditUserDto) {
        const _user = await this.findById(id);
        if (!_user) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Неверный идентификатор пользователя',
                },
                HttpStatus.FORBIDDEN,
            );
        }

        _user.firstName = user.firstName || _user.firstName;
        _user.email = user.email || _user.email;
       if (checkPermission(Modules.changeRole, _user.roles)) {
        _user.roles = user.roles || _user.roles;
       }

       _user.password = (await hach(user.password)) || _user.password;

        return this.usersRepository.save(_user);
    }

    async findById(id: number) {
        return this.usersRepository.findOne(id);
    }

    async findByEmail(email): Promise<UsersEntity> {
        return this.usersRepository.findOne({email});
    }
}
