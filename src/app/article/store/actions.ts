import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Article } from "src/app/shared/models/article";
export const articleActions = createActionGroup({
	source: 'article',
	events: {
		get_article: props<{ slug: string }>(),
		get_article_success: props<{ article: Article }>(),
		get_article_failure: emptyProps(),

		remove_article: props<{ slug: string }>(),
		remove_article_success: emptyProps(),
		remove_article_failure: emptyProps(),
	}
})


