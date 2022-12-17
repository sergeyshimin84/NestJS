import { RolesGuard } from './../auth/role/roles.guard';
import { UsersModule } from './../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from '../mail/mail.module';
import { NewsEntity } from './news.entity';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [NewsController],
  providers: [
    NewsService, 
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),
    CommentsModule, 
    MailModule,
    UsersModule,
  ],
  exports: [TypeOrmModule.forFeature([NewsEntity]), NewsService],
})
export class NewsModule {}
