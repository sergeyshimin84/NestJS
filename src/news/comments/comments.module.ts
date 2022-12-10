import { CommentsEntity } from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { NewsModule } from '../news.module';
import { UsersModule } from './../../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsEntity]), 
    forwardRef(() => NewsModule),
    UsersModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService, TypeOrmModule.forFeature([CommentsEntity]),]
})
export class CommentsModule {}
