import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [NewsModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
