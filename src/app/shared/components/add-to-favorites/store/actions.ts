import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Article } from "src/app/shared/models/article";

export const addToFavoritesActions = createActionGroup({
	source: 'addToFavorites',
	events: {
		add_to_favorites: props<{ isFavorited: boolean, slug: string }>(),
		add_to_favorites_success: props<{ article: Article }>(),
		add_to_favorites_failure: emptyProps(),
	}
});