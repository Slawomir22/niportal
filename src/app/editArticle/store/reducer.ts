import { createFeature, createReducer, on } from "@ngrx/store";
import { routerNavigatedAction } from "@ngrx/router-store";
import { StateEditArticle } from "../models/stateEditArticle"
import { editGetArticleActions } from "./actions";



const initialState: StateEditArticle = {
	article: null,
	isBeingSubmitted: false,
	isBeingLoaded: false,
	errors: null,
}

const editArticleFunctionality = createFeature({
	name: 'editArticle',
	reducer: createReducer(
		initialState,
		on(editGetArticleActions.get_article, (state) => ({ ...state, isBeingLoaded: true })),
		on(editGetArticleActions.get_article_success, (state, action) => ({ ...state, isBeingLoaded: false, article: action.article })),
		on(editGetArticleActions.get_article_failure, (state) => ({ ...state, isBeingLoaded: false })),
		on(editGetArticleActions.edit_article, (state) => ({ ...state, isBeingSubmitted: true })),
		on(editGetArticleActions.edit_article_success, (state) => ({ ...state, isBeingSubmitted: false })),
		on(editGetArticleActions.edit_article_failure, (state, action) => ({ ...state, isBeingSubmitted: false, errors: action.errors })),
		on(routerNavigatedAction, () => initialState)

	)
})


export const { name: editArticleFunctionalityKey, reducer: editArticleFunctionalityReducer, selectIsBeingLoaded, selectIsBeingSubmitted, selectErrors, selectArticle } = editArticleFunctionality;