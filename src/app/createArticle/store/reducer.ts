import { createFeature, createReducer, on } from "@ngrx/store";
import { routerNavigatedAction } from "@ngrx/router-store";
import { StateCreateArticle } from "../models/stateCreateArticle";
import { createArticleActions } from "./actions";



const initialState: StateCreateArticle = {
	isBeingSubmitted: false,
	errors: null,
}

const createArticleFunctionality = createFeature({
	name: 'createArticle',
	reducer: createReducer(
		initialState,
		on(createArticleActions.create_article, (state) => ({ ...state, isBeingLoaded: true })),
		on(createArticleActions.create_article_success, (state) => ({ ...state, isBeingSubmitted: false })),
		on(createArticleActions.create_article_failure, (state, action) => ({ ...state, isBeingSubmitted: false, errors: action.errors })),
		on(routerNavigatedAction, () => initialState)

	)
})


export const { name: createArticleFunctionalityKey, reducer: createArticleFunctionalityReducer, selectIsBeingSubmitted, selectErrors } = createArticleFunctionality;