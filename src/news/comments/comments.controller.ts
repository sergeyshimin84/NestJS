import { CommentsService } from './comments.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {    
    }

    @Get('/:newsId')
    get(@Param('newsId') newsId: string | number) {
        return this.commentsService.find(newsId)
    }

    @Get('/news/:id/detail')
    getDetail(@Param('newsId') newsId: string | number, @Body() comment: Comment) {
        return this.commentsService.create(newsId, comment)
    }

    @Post('/:newsId')
    create(@Param('newsId') newsId: string | number, @Body() comment: Comment) {
        return this.commentsService.create(newsId, comment)
    }

    @Put('/:newsId/:commentId')
    request(@Param('newsId') newsId: string | number, @Body() comment: Comment) {
        return this.commentsService.create(newsId, comment)
    }

    @Delete('/:newsId/:commentId')
    remove(
        @Param('newsId') newsId: string | number,
        @Param('commentId') commentId: string | number,
    ) {
       return this.commentsService.remove(newsId, commentId);
    }
}
