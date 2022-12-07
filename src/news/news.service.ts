import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './create.news.dto';
import { News, AllNews, NewsEdit } from './news.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { formatWithCursor } from 'prettier';

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,
  ) {} 
  private readonly news: News[] = [
    {
      id: 1,
      title: 'Наша первая новость',
      description: 'Уррааа! Наша первая новость',
      author: 'Владислав',
      countView: 12,
      cover: 
        `https://i.gifer.com/RRzL.gif`,
    },
  ];

  async create(news: CreateNewsDto): Promise<NewsEntity> {
    const newsEntity = new NewsEntity();
    newsEntity.title = news.title;
    newsEntity.description = news.description;
    newsEntity.cover = news.cover;
    return await this.newsRepository.save(newsEntity);
  }

  find(id: News['id']): News | undefined {
    return this.news.find((news: News) => news.id === id);
  }

  getAll(): News[] {
    return this.news;
  }

  remove(id: number | string): boolean {
    if (this.news[id]) {
      delete this.news[id]
      return true;
    }

    return false;
  }

  edit(id: number, news: NewsEdit): News | undefined {
    const indexEditableNews = this.news.findIndex((news: News) => news.id === id);
    if (indexEditableNews !== -1) {
      this.news[indexEditableNews] = {
        ...this.news[indexEditableNews],
        ...news,
      };

      return this.news[indexEditableNews];
    }

    return undefined;
  }
}