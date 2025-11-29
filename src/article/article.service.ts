import { ArticleEntity } from "@/article/article.entity";
import { CreateArticleDto } from "@/article/dto/createArticle.dto";
import { UpdateArticleDto } from "@/article/dto/updateArticle.dto";
import { IArticleResponse } from "@/article/types/articles.interfacle";
import { UserEntity } from "@/user/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import slugify from "slugify";
import { Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>
    ) { }

    async createArticle(user: UserEntity, createArticleDto: CreateArticleDto) {
        const article = new ArticleEntity();
        Object.assign(article, createArticleDto)
        if (!article.tagList) {
            article.tagList = []
        }
        article.slug = this.generateSlug(article.title)
        article.author = user
        return await this.articleRepository.save(article);
    }

    async updateArticle(slug: string, currentUserId: number, updateArticleDto: UpdateArticleDto) {
        const article = await this.findBySlug(slug);
        if (article.authorId !== currentUserId) {
            throw new HttpException("You are not author. what the hell you are going to update?", HttpStatus.FORBIDDEN)
        }
        if (article.title) {
            article.slug = this.generateSlug(article.title)
        }
        Object.assign(article, updateArticleDto)
        return await this.articleRepository.save(article);
    }

    async getArticle(slug: string): Promise<ArticleEntity> {
        return await this.findBySlug(slug);
    }

    async deleteArticle(slug: string, currentUserId: number): Promise<DeleteResult> {
        const article = await this.findBySlug(slug)
        if (article.authorId !== currentUserId) {
            throw new HttpException("You are not author. what the hell you are going to delete?", HttpStatus.FORBIDDEN)
        }
        return this.articleRepository.delete({ slug })
    }

    async getAll(currentUserId): Promise<ArticleEntity[]> {
        return await this.articleRepository.find({
            where: {
                authorId: currentUserId
            }
        })
    }
    async findBySlug(slug: string): Promise<ArticleEntity> {
        const article = await this.articleRepository.findOne({
            where: {
                slug
            }
        })
        if (!article) {
            throw new HttpException("Article Not Found", HttpStatus.NOT_FOUND)
        }
        return article;
    }

    generateSlug(title: string): string {
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
        return `${slugify(title, { lower: true, })}-${id}`
    }
    generateArticleResponse(article: ArticleEntity): IArticleResponse {
        return {
            article,
        }
    }
}