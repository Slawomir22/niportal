import { Article } from "src/app/shared/models/article";
import { BackEndErrors } from "src/app/shared/models/backEndErrors";

export interface StateEditArticle {
	article: Article | null
	isBeingLoaded: boolean;
	isBeingSubmitted: boolean;
	errors: BackEndErrors | null;
}
