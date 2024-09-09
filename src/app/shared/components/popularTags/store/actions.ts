import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Tag } from "src/app/shared/models/tag";


export const popularTagsActions = createActionGroup({
	source: 'popular Tags',
	events: {
		get_popular_tags: emptyProps(),
		get_popular_tags_success: props<{ popularTags: Tag[] }>(),
		get_popular_tags_failure: emptyProps(),

	}
})