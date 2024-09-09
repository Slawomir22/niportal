import { createActionGroup, props } from "@ngrx/store";
import { Article } from "src/app/shared/models/article";
import { ArticleRequest } from "src/app/shared/models/articleRequest";
import { BackEndErrors } from "src/app/shared/models/backEndErrors";
export const createArticleActions = createActionGroup({
	source: 'createArticle',
	events: {
		create_article: props<{ articleRequest: ArticleRequest }>(),
		create_article_success: props<{ article: Article }>(),
		create_article_failure: props<{ errors: BackEndErrors }>(),
	}
})


