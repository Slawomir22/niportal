import { Article } from "src/app/shared/models/article";

export interface FeedResponse {
	articles: Article[];
	articlesCount: number;
}
