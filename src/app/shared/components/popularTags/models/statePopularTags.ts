import { Tag } from "src/app/shared/models/tag";

export interface StatePopularTags {
	isBeingLoaded: boolean;
	error: string | null;
	data: Tag[] | null;
}
