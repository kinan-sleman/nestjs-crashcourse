import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ArticleModule } from '@/article/article.module';
import config from '@/ormconfig';
import { TagModule } from '@/tag/tag.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    // we need to add ConfigModule (when we working with .env file)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ArticleModule,
    TagModule,
    UserModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
