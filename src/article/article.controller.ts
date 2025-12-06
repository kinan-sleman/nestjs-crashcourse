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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

@Controller("articles")
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }
    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new article' })
    @ApiResponse({ status: 201, description: 'Article created successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiBody({ type: CreateArticleDto })
    async createArticle(
        @User() user: UserEntity, @Body() createArticleDto: CreateArticleDto
    )
        : Promise<IArticleResponse> {
        const savedArticle = await this.articleService.createArticle(user, createArticleDto)
        return this.articleService.generateArticleResponse(savedArticle);
    }
    @Get("feed")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get articles feed for current user' })
    @ApiResponse({ status: 200, description: 'Return articles feed.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit number of articles returned (default is unlimited)' })
    @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Offset/skip number of articles (for pagination)' })
    async getUsersFeed(@User('id') currentUserId: number, @Query() query: any): Promise<IArticlesResopnse> {
        return await this.articleService.getFeed(currentUserId, query)
    }
    @Put(":slug")
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update an article' })
    @ApiResponse({ status: 200, description: 'Article updated successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiBody({ type: UpdateArticleDto })
    async updateArticle(@Param("slug") slug: string, @User("id") currentUserId: number, @Body() updateArticleDto: UpdateArticleDto): Promise<IArticleResponse> {
        const updatedArticle = await this.articleService.updateArticle(slug, currentUserId, updateArticleDto)
        return this.articleService.generateArticleResponse(updatedArticle);
    }
    @Get(':slug')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a single article' })
    @ApiResponse({ status: 200, description: 'Article retrieved successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async getSingleArticle(@Param("slug") slug: string): Promise<ArticleEntity> {
        return await this.articleService.getArticle(slug)
    }
    @Delete(":slug")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete an article' })
    @ApiResponse({ status: 200, description: 'Article deleted successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async deleteArticle(@Param("slug") slug: string, @User('id') currentUserId: number) {
        return await this.articleService.deleteArticle(slug, currentUserId)
    }
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all articles' })
    @ApiResponse({ status: 200, description: 'Return all articles.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async findAll(@User("id") currentUserId: number, @Query() query: any): Promise<IArticlesResopnse> {
        return await this.articleService.findAll(query, currentUserId);
    }

    @Post(":slug/favorite")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add article to favorites' })
    @ApiResponse({ status: 200, description: 'Article added to favorites successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async addToFavorite(@User("id") currentUserId: number, @Param('slug') slug: string): Promise<IArticleResponse> {
        return await this.articleService.addToFavorite(currentUserId, slug)
    }

    @Delete(":slug/favorite")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Remove article from favorites' })
    @ApiResponse({ status: 200, description: 'Article removed from favorites successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async removeArticleFromFavorites(@User("id") currentUserId: number, @Param('slug') slug: string): Promise<IArticleResponse> {
        return await this.articleService.removeFromFavorites(currentUserId, slug)
    }
}