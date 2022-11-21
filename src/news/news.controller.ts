import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';

import { NewsEdit } from './news.interface';
import { NewsService } from './news.service';
import { CreateNewsDto } from './create.news.dto';
import { News } from './news.interface';
import { htmlTemplate } from '../views/template';
import { newsTemplate } from '../views/news';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('all')
  async getAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get('/:id')
  get(@Param('id') id: number) {
    return this.newsService.find(id);
  }

  @Get()
  async getViewAll(): Promise<string> {
    const news = this.newsService.findAll();
    
    return htmlTemplate(newsTemplate(news));
  }

  @Post()
  create(@Body() createNewsDto: News) {
    return this.newsService.create(createNewsDto) ? 'Новость успешно изменена' : 'Ошибка изменения';
  }

  @Patch('/:id')
  edit(@Param('id') id: number, @Body() news: NewsEdit) {
    return this.newsService.edit(id, news);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    const isRemoved = this.newsService.remove(id);

    return isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор';
  }
}