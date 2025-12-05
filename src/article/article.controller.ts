import { ArticleEntity } from "@/article/article.entity";
import { ArticleService } from "@/article/article.service";
import { CreateArticleDto } from "@/article/dto/createArticle.dto";
import { UpdateArticleDto } from "@/article/dto/updateArticle.dto";
import { IArticleResponse } from "@/article/types/articles.interfacle";
import { IArticlesResopnse } from "@/article/types/articlesResponse.interface";
import { User } from "@/user/decorators/user.decorator";
import { AuthGuard } from "@/user/guards/auth.guard";
import { UserEntity } from "@/user/user.entity";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";

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
    @Put(":slug")
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    async updateArticle(@Param("slug") slug: string,@User("id") currentUserId: number,@Body('article') updateArticleDto: UpdateArticleDto): Promise<IArticleResponse> {
        const updatedArticle = await this.articleService.updateArticle(slug, currentUserId, updateArticleDto)
        return this.articleService.generateArticleResponse(updatedArticle);
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
    @Get()
    async findAll(@User("id") currentUserId: number, @Query() query: any): Promise<IArticlesResopnse> {
        return await this.articleService.findAll(query, currentUserId);
    }

    @Post(":slug/favorite")
    @UseGuards(AuthGuard)
    async addToFavorite(@User("id") currentUserId: number, @Param('slug') slug: string): Promise<IArticleResponse> {
        return await this.articleService.addToFavorite(currentUserId, slug)
    }

    @Delete(":slug/favorite")
    @UseGuards(AuthGuard)
    async removeArticleFromFavorites(@User("id") currentUserId: number, @Param('slug') slug: string): Promise<IArticleResponse> {
        return await this.articleService.removeFromFavorites(currentUserId, slug)
    }
}