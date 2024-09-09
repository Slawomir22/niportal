import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FeedResponse } from "../models/feed-response";

export const feedActions = createActionGroup({
	source: 'feeds',
	events: {
		get_feed: props<{ url: string }>(),
		get_feed_success: props<{ feed: FeedResponse }>(),
		get_feed_failure: emptyProps(),
	}

})