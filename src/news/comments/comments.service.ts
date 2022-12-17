import { checkPermission, Modules } from './../../utils/check-permission';
import { UsersService } from './../../users/users.service';
import { NewsService } from './../news.service';
import { CommentsEntity } from './comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { Repository } from 'sequelize-typescript';
import { EventsComment } from './dtos/EventsComment.enum';

export type Comment = {
    id?: number;
    message: string;
    author: string;
};

export type CommentEdit = {
    id?: number;
    message?: string;
    author?: string;
};

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsEntity)
        private readonly commentsRepository: Repository<CommentsEntity>,
        private readonly NewsService: NewsService,
        private readonly UsersService: UsersService,
    ) {}
    private readonly comments = {};

    async create(
        idNews: number,
        comment: string,
        idUser: number,
    ): Promise<CommentsEntity> {
        const _news = await this.NewsService.findById(idNews);
        if (!_news) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Новость не найдена',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        const _user = await this.userService.findById(comment.userId);
        if (!_user) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Пользователь не найден',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        const commentEntity = new CommentsEntity();
        commentEntity.news = _news;
        commentEntity.user = _user;
        commentEntity.message = message;

        return this.commentsRepository.save(commentEntity);
    }

    async edit(idComment: number, comment: CommentEdit): Promise<CommentsEntity> {
        const _comment = await this.commentsRepository.findOne({
            wher: {id: idComment},
            relations: ['news', 'user'],
        });
        _comment.message = comment.message;
        return this.commentsRepository.save(_comment);
    }

    async findAll(idNews: number): Promise<CommentsEntity[]> {
        return this.commentsRepository.find({
            where: {news: idNews},
            relations: ['user'],
        });
    }

    async remove(idComment: number, userId: number): Promise<CommentsEntity> {
        const _comment = await this.commentsRepository.findOne({
            where: { id: idComment },
            relations: ['news'],
        });
        if (!_comment) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Комментарий не найден',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        const _user = await this.UsersService.findById(userId);
        if (_user.id !== _comment.user.id && 
            !checkPermission(Modules.editComment, _user.roles)
            ) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Недостаточно прав для удаления',
                },
                HttpStatus.FORBIDDEN,
            );
        }
    
        const comment = await this.commentsRepository.remove(_comment);
        this.eventEmitter.emit(EventsComment.remove, {
            commentId: idComment,
            newsId: _comment.news.id,
        });

        return comment;
    }

    async removeAll(idNews) {
        const _comments = await this.findAll(idNews);
        return await this.commentsRepository.remove(_comments);
    }
}