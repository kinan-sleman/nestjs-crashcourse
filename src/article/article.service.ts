import { ArticleEntity } from "@/article/article.entity";
import { CreateArticleDto } from "@/article/dto/createArticle.dto";
import { UpdateArticleDto } from "@/article/dto/updateArticle.dto";
import { IArticleResponse } from "@/article/types/articles.interfacle";
import { IArticlesResopnse } from "@/article/types/articlesResponse.interface";
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
        private readonly articleRepository: Repository<ArticleEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
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

    async findAll(query: any): Promise<IArticlesResopnse> {
        const queryBuilder = this.articleRepository
            .createQueryBuilder("articles")
            .leftJoinAndSelect("articles.author", "author")
        // filter by tag
        if (query.tag) {
            queryBuilder.andWhere('articles.tagList LIKE :tag', {
                tag: `${query.tag}`
            })
        }
        // filter by author
        if (query.author) {
            const author = await this.userRepository.findOne({
                where: {
                    username: query.author
                }
            })
            if (author) {
                queryBuilder.andWhere('articles.authorId = :id', {
                    id: author.id
                })
            } else {
                return {
                    articles: [],
                    articlesCount: 0,
                }
            }
        }
        const articlesCount = await queryBuilder.getCount();
        // limit query
        if (query.limit) {
            queryBuilder.limit(query.limit)
        }
        // offset query
        if (query.offset) {
            queryBuilder.offset(query.offset)
        }
        queryBuilder.orderBy("articles.createdAt", "DESC")
        const articles = await queryBuilder.getMany();
        return {
            articles,
            articlesCount,
        }
    }

    async addToFavorite(currentUserId: number, slug: string): Promise<IArticleResponse> {
        const currentUser = await this.userRepository.findOne({
            where: {
                id: currentUserId
            },
            relations: ['favorites']
        })
        if (!currentUser) {
            throw new HttpException(`User with ID: ${currentUserId} not found`, HttpStatus.NOT_FOUND)
        }
        const currentArticle = await this.findBySlug(slug)
        if (!currentUser.favorites) {
            currentUser.favorites = []
        }
        const isNotFavorite = !currentUser.favorites.find(
            (article) => article.slug === currentArticle.slug
        )
        if (isNotFavorite) {
            currentArticle.favoritesCount++
            currentUser.favorites.push(currentArticle)
            await this.articleRepository.save(currentArticle)
            await this.userRepository.save(currentUser)
        }
        return this.generateArticleResponse(currentArticle)
    }

    async removeFromFavorites(currentUserId: number, slug: string): Promise<IArticleResponse> {
        console.log({slug})
        const currentUser = await this.userRepository.findOne({
            where: {
                id: currentUserId
            },
            relations: ['favorites']
        })
        if (!currentUser) {
            throw new HttpException(`User with ID: ${currentUserId} not found`, HttpStatus.NOT_FOUND)
        }
        const currentArticle = await this.findBySlug(slug)
        if (!currentUser.favorites) {
            currentUser.favorites = []
        }
        const isFavorite = currentUser.favorites.find(
            (article) => article.slug === currentArticle.slug
        )
        if (isFavorite) {
            currentArticle.favoritesCount--
            currentUser.favorites = currentUser.favorites.filter(
                (article) => article.slug !== currentArticle.slug
            )
            await this.articleRepository.save(currentArticle)
            await this.userRepository.save(currentUser)
        }
        return this.generateArticleResponse(currentArticle)
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