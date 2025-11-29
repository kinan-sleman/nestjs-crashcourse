import { ArticleEntity } from "@/article/article.entity";

export interface IArticlesResopnse {
    articles: ArticleEntity[],
    articlesCount: number
}