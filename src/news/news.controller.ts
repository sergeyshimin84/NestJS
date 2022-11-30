import { CreateNewsDto } from './create.news.dto';
import { Body, Controller, Delete, Get, Param, Post, Patch, UseInterceptors, UploadedFile, Put } from '@nestjs/common';

import { NewsService } from './news.service';
import { News } from './news.interface';
import { htmlTemplate } from '../views/template';
import { newsTemplate } from '../views/news';
import { NewsIdDto } from './comments/dtos/news-id.dto/news-id.dto';
import { CommentsService } from './comments/comments.service';
import { News } from './news.interface';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentsService,
  ) {}

  @Get('api/detail/:id')
  get(@Param('id') id: string): News {...}

  @Get('/api/all')
  getAll(): News[] {...}
  
  @Get('/detail/:id')
  getDetailView(@Param('id') id: string) {...}

  @Post('/api')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ): News {
    if (cover?.filename) {
      news.cover = PATH_NEWS + cover.filename;
    }

    return this.newsService.create(news);
  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: EditNewsDto): News {...}

  @Delete('/api/:id')
  remove(@Param('id') id: string): string {...}
}