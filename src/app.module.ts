import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import config from '@/ormconfig';
import { TagModule } from '@/tag/tag.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot(config),TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
