import { Tag } from "./tag";
import { Profile } from "./profile";

export interface Article {
	body: string;
	createdAt: string;
	description: string;
	favorited: boolean
	favoritesCount: number;
	slug: string;
	tagList: Tag[];
	title: string;
	updatedAt: string;
	author: Profile;
}
