import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import config from '@/ormconfig';
import { TagModule } from '@/tag/tag.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  // import this (TypeOrmModule) , and use forRoot for all application
  // we can use forFeature for just one feature
  // but in our case we need for Root
  // and pass our config to it like this:
  imports: [TypeOrmModule.forRoot(config),TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
