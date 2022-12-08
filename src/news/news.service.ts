import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './create.news.dto';
import { News, AllNews, NewsEdit } from './news.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { formatWithCursor } from 'prettier';



@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,
  ) {}

  async create(news: CreateNewsDto): Promise<NewsEntity> {
    const newsEntity = new NewsEntity();
    newsEntity.title = news.title;
    newsEntity.description = news.description;
    newsEntity.cover = news.cover;
    return await this.newsRepository.save(newsEntity);
  }

  findById(id: News['id']): Promise<NewsEntity> {
    return this.newsRepository.findOne(id);
  }

  getAll(): Promise<NewsEntity>[] {
    return this.newsRepository.find({});
  }

  async edit(id: number, news: NewsEdit): Promise<NewsEntity | null> {
    const editableNews = await this.findById(id);
    if (editableNews) {
      const newsEntity = new NewsEntity();
      newsEntity.title = news.title || editableNews.title;
      newsEntity.description = news.description || editableNews.description;
      newsEntity.cover = news.cover || editableNews.cover;

      return this.newsRepository.save(newsEntity);
    }
    return null;
  }

  async remove(id: News['id']): Promise<NewsEntity | null> {
    const removeNews = await this.findById(id);
    if (removeNews) {
      return this.newsRepository.remove(removeNews);
    }
    return null;
  }
}