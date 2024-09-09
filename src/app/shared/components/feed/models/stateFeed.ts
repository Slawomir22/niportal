import { FeedResponse } from "./feed-response";

export interface StateFeed {
	isBeingLoaded: boolean;
	error: string | null;
	data: FeedResponse | null;
}
