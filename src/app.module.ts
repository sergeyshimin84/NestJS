import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { MailModule } from './mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuchController } from './auch/auch.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234',
        database: 'nest-news-blog',
        entities: ["dist/**/*.entyty{.js,.js}"],
        synchronize: true,
      }),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'public'),
      }),
      NewsModule,
      MailModule,
      UsersModule,
      AuthModule,
    ],
  controllers: [AppController, AuchController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
