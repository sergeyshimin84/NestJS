import { CommentsService } from './comments.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {    
    }

    @Get('/:newsId')
    get(@Param('newsId') newsId: string | number) {
        return this.commentsService.find(newsId)
    }

    @Post('/:newsId')
    create(@Param('newsId') newsId: string | number, @Body() comment: Comment) {
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
