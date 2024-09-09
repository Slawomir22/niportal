import { Article } from "src/app/shared/models/article";

export interface StateArticle {
	isBeingLoaded: boolean;
	error: string | null;
	article: Article | null;
}