import { EditCommentDto } from './comments/dtos/edit-comment-dto';
import { NewsEntity } from './news.entity';
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
  ParseIntPipe,
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
  async get(@Param('id', ParseIntPipe) id: number): Promise<NewsEntity> {
    const news = this.newsService.findById(id);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return news;
  }

  @Get('api/all')
  async getAll(): Promise<NewsEntity[]> {
    return this.newsService.getAll();
  }

  @Get('/all')
  @Render('news-list')
  async getAllView() {
    const news = await this.newsService.getAll();

    return { news, title: 'Список новочтей!' };
  }

  @Get('/create/new')
  @Render('create-news')
  async createView() {
    return {};
  }

  @Get('/detail/:id')
  @Render('news-detail')
  async getDatailView(@Param('id', ParseIntPipe) id: number) {
    const news = await this.newsService.findById(id);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return news;
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
      @UploadedFile() cover,
    ): Promise<NewsEntity> {
      const fileExtension = cover.originalname.split('.').reverse()[0];
      if (!fileExtension || !fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Неверный формат данных',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (cover?.filename)
        news.cover = PATH_NEWS + cover.filename;
      
      const createdNews = await this.newsService.create(news);
      await this.mailService.sendNewNewsForAdmins(
        ['snezhkinv@yandex.ru', 'snezhkinv20@gmail.com'],
        _news,
      );
      return _news;
    }
  
  @Put('/api/:id')
  async edit(
    @Param('id', ParseIntPipe) id: number, 
    @Body() news: EditCommentDto
  ): Promise<NewsEntity> {
    const newsEditable = await this.newsService.edit(id, news);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return newsEditable; 
  }

  @Delete('/api/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<NewsEntity> {
    const isRemoved = await this.newsService.remove(id);
    throw new HttpException(
      {
        status: HttpStatus.OK,
        error: isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор';
      }
      HttpStatus.OK,
    );
  }
}


  