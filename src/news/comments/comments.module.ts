import { AuthModule } from './../../auth/auth.module';
import { CommentsEntity } from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { SocketCommentsGateway } from './socket-comments.gateway';
import { CommentsService } from './comments.service';
import { NewsModule } from '../news.module';
import { UsersModule } from './../../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsEntity]), 
    forwardRef(() => NewsModule),
    UsersModule,
    AuthModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, SocketCommentsGateway],
  exports: [CommentsService, TypeOrmModule.forFeature([CommentsEntity]),]
})
export class CommentsModule {}
