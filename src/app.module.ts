import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import config from '@/ormconfig';
import { TagModule } from '@/tag/tag.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  // don't forget to import it to working fine
  imports: [TypeOrmModule.forRoot(config),TagModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
