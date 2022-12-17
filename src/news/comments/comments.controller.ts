import { checkPermission, Modules } from './../../utils/check-permission';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { EditCommentDto } from './dtos/edit-comment-dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { HelperFileLoader } from '../../utils/HelperFileLoader';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { Req } from '@nestjs/common/decorators';

const PATH_NEWS = '/news-static/comments/';
HelperFileLoader.path = PATH_NEWS;

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get('/api/details/:idNews')
    get(@Param('idNews', ParseIntPipe) idNews: number) {
        return this.commentsService.findAll,(idNews);
    }

    @Put('/api/:idComment')
    edit(
        @Param('idComment', ParseIntPipe) idComment: number,
        @Body() comment: EditCommentDto,
    ) {
        return this.commentsService.edit(idComment, comment);
    }

    @Post('/api/:idNews')
    @UseGuards(JwtAuthGuard)
    create(@Param('idNews', ParseIntPipe) idNews: number,
    @Body() comment: CreateCommentDto,
    @Req() req,
    ) {
        const jwtUserId = req.user.userId;
        return this.commentsService.create(idNews, comment.message, jwtUserId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/api/details/:idNews/:idComment')
    remove(@Param('idComment', ParseIntPipe) idComment: number, @Req() req) {
        const userId = req.user.id;
        return this.commentsService.remove(idComment, userId);
    }
}