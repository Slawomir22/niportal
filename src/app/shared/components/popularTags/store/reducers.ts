import { createFeature, createReducer, on } from "@ngrx/store";
import { StatePopularTags } from "../models/statePopularTags";
import { popularTagsActions } from "./actions";

const initialState: StatePopularTags = {
	isBeingLoaded: false,
	error: null,
	data: null

}



const popularTagsFunctionality = createFeature({
	name: 'popularTags',
	reducer: createReducer(
		initialState,
		on(popularTagsActions.get_popular_tags, (state) => ({ ...state, isBeingLoaded: true })),
		on(popularTagsActions.get_popular_tags_success, (state, action) => ({ ...state, isBeingLoaded: false, data: action.popularTags })),
		on(popularTagsActions.get_popular_tags_success, (state) => ({ ...state, isBeingLoaded: false })),

	)
})


export const { name: popularTagsFunctionalityKey, reducer: popularTagsFunctionalityReducer, selectIsBeingLoaded, selectError, selectData } = popularTagsFunctionality