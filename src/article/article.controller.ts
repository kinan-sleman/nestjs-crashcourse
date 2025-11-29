import { ArticleEntity } from "@/article/article.entity";
import { ArticleService } from "@/article/article.service";
import { CreateArticleDto } from "@/article/dto/createArticle.dto";
import { IArticleResponse } from "@/article/types/articles.interfacle";
import { User } from "@/user/decorators/user.decorator";
import { AuthGuard } from "@/user/guards/auth.guard";
import { UserEntity } from "@/user/user.entity";
import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";

@Controller("articles")
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }
    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    async createArticle(
        @User() user: UserEntity, @Body('article') createArticleDto: CreateArticleDto
    )
        : Promise<IArticleResponse> {
        const savedArticle = await this.articleService.createArticle(user, createArticleDto)
        return this.articleService.generateArticleResponse(savedArticle);
    }
    @Get('all')
    @UseGuards(AuthGuard)
    async getAllArticles(): Promise<ArticleEntity[]> {
        return await this.articleService.getAll()
    }
    @Get(':slug')
    @UseGuards(AuthGuard)
    async getSingleArticle(@Param("slug") slug: string): Promise<ArticleEntity> {
        return await this.articleService.getArticle(slug)
    }
    @Delete(":slug")
    @UseGuards(AuthGuard)
    async deleteArticle(@Param("slug") slug: string, @User('id') currentUserId: number) {
        return await this.articleService.deleteArticle(slug, currentUserId)
    }
}