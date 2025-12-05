import { ArticleController } from "@/article/article.controller";
import { ArticleEntity } from "@/article/article.entity";
import { ArticleService } from "@/article/article.service";
import { UserEntity } from "@/user/user.entity";
import { UserService } from "@/user/user.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity])],
    controllers: [ArticleController],
    providers: [ArticleService, UserService],
})
export class ArticleModule { }