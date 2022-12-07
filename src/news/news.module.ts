import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),
    CommentsModule, 
    MailModule],
})
export class NewsModule {}
