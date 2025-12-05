import { ArticleController } from "@/article/article.controller";
import { ArticleEntity } from "@/article/article.entity";
import { ArticleService } from "@/article/article.service";
import { FollowEneity } from "@/profile/follow.entity";
import { UserEntity } from "@/user/user.entity";
import { UserService } from "@/user/user.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity, FollowEneity])],
    controllers: [ArticleController],
    providers: [ArticleService, UserService],
})
export class ArticleModule { }