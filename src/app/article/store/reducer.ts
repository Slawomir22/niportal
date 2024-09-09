import { createFeature, createReducer, on } from "@ngrx/store";
import { StateArticle } from "../models/stateArticle";
import { articleActions } from "./actions";
import { routerNavigatedAction } from "@ngrx/router-store";


const initialState: StateArticle = {
	isBeingLoaded: false,
	error: null,
	article: null
}

const articleFunctionality = createFeature({
	name: 'article',
	reducer: createReducer(
		initialState,
		on(articleActions.get_article, (state) => ({ ...state, isBeingLoaded: true })),
		on(articleActions.get_article_success, (state, action) => ({ ...state, isBeingLoaded: false, article: action.article })),
		on(articleActions.get_article_failure, (state) => ({ ...state, isBeingLoaded: false })),
		on(routerNavigatedAction, () => initialState)

	)
})


export const { name: articleFunctionalityKey, reducer: articleFunctionalityReducer, selectIsBeingLoaded, selectError, selectArticle: selectArticleData } = articleFunctionality;