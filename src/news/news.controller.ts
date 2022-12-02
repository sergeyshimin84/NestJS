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
  const helperFileLoader = new HelperFileLoader();
  helperFileLoader.path = PATH_NEWS;
  
  const imageFileFilter = (req, file, callback) => {
    const fileExtension = file.originalname.split('.').reverse()[0];
  
    if (!fileExtension || !fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
      callback(new Error('Excepted image'), false);
    }
    callback(null, true);
  };
  
  @Controller('news')
  export class NewsController {
    constructor(
      private readonly newsService: NewsService,
      private readonly commentService: CommentsService,
      private mailService: MailService,
  ) {}
  @Post()
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
  