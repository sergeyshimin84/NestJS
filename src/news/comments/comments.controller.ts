import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Comment, CommentEdit, CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment-dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get('/api/details/:idNews')
    get(@Param('idNews') idNews: string) {
        const idNewsInt = parseInt(idNews);
        return this.commentsService.find(idNewsInt);
    }

    @Put('/api/:idNews/:idComment')
    edit(
        @Param('idNews') idNews: string,
        @Param('idComment') idComment: string,
        @Body() comment: CommentEdit,
    ) {
        const idNewsInt = parseInt(idNews);
        const idCommentInt = parseInt(idComment);
        return this.commentsService.edit(idNewsInt, idCommentInt, comment);
    }

    @Post('/api/:idNews')
    create(@Param('idNews') idNews: string, @Body() comment: CreateCommentDto) {
        const idNewsInt = parseInt(idNews);
        return this.commentsService.create(idNewsInt, comment);
    }

    @Delete('/api/details/:idNews/:idComment')
    remove(
        @Param('idNews') idNews: string,
        @Param('idComment') idComment: string,
    ) {
        const idNewsInt = parseInt(idNews);
        const idCommentInt = parseInt(idComment);
        return this.commentsService.remove(idNewsInt, idCommentInt);
    }
}