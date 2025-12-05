import { Article } from "@/article/types/article.type";

export interface IArticlesResopnse {
    articles: Article[],
    articlesCount: number
}