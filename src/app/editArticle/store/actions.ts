import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Article } from "src/app/shared/models/article";
import { ArticleRequest } from "src/app/shared/models/articleRequest";
import { BackEndErrors } from "src/app/shared/models/backEndErrors";
export const editGetArticleActions = createActionGroup({
	source: 'editGetArticle',
	events: {
		get_article: props<{ slug: string }>(),
		get_article_success: props<{ article: Article }>(),
		get_article_failure: emptyProps(),

		edit_article: props<{ articleRequest: ArticleRequest, slug: string }>(),
		edit_article_success: props<{ article: Article }>(),
		edit_article_failure: props<{ errors: BackEndErrors }>(),
	},
})


