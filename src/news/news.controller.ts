import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Render,
  Res,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { News } from './news.interface';
import { NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { NewsIdDto } from './dtos/news-id.dto';
import { NewsCreateDto } from './dtos/news-create.dto';
import { HelperFileLoader } from '../utils/HelperFileLoader';
import { MailService } from '../mail/mail.service';
  
const PATH_NEWS = '/news-static/';
HelperFileLoader.path = PATH_NEWS;
  
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentsService,
    private readonly mailService: MailService,
  ) {}

  @Get('/api/detail/:id')
  get(@Param('id') id: string): News {
    const inInt = parseInt(id);
    const news = this.newsService.find(inInt);
    const comments = this.commentService.find(inInt);

    return {
      ...news,
      comments,
    };
  }

  @Get('api/all')
  getAll(): News[] {
    console.log('getAll');
    const news = this.newsService.getAll();
    return news;
  }

  @Get('/all')
  @Render('news-list')
  getAllView() {
    const news = this.newsService.getAll();

    return { news, title: 'Список новочтей!' };
  }

  @Get('/create/new')
  @Render('create-news')
  async createView() {
    return {};
  }

  @Get('/detail/:id')
  @Render('news-detail')
  getDataView(@Param('id') id: string) {
    const inInt = parseInt(id);
    const news = this.newsService.find(inInt);
    const comments = this.commentService.find(inInt);

    return {
      news,
      comments,
    };
  }

  @Post('/api')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
      destination: helperFileLoader.destinationPath,
      filename: helperFileLoader.customFileName,
      }),
    }),
  )
    async create(
      @Body() news: NewsCreateDto,
      @UploadedFile() cover: Express.Multer.File,
    ) {
      console.log(news);
      let coverPath = undefined;
      if (cover?.filename?.length > 0) coverPath = PATH_NEWS + cover.filename;
      
      const _news = this.newsService.create({ ...news, cover: coverPath });
      await this.mailService.sendNewNewsForAdmins(
        ['snezhkinv@yandex.ru', 'snezhkinv20@gmail.com'],
        _news,
      );
      return _news;
    }
}


  