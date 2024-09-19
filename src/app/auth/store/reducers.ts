import { createFeature, createReducer, on } from "@ngrx/store";
import { StateAuth } from "../models/stateAuth";
import { authUserActions } from "./actions";
import { routerNavigatedAction } from "@ngrx/router-store";
import { state } from "@angular/animations";
import { Action } from "rxjs/internal/scheduler/Action";

const initialState: StateAuth = {
	isBeingSent: false,
	user: undefined,
	isBeingLoaded: false,
	validationErrors: null
}


const authFunctionality = createFeature({
	name: 'auth',
	reducer: createReducer(
		initialState,
		on(authUserActions.register_user, (state) => ({ ...state, isBeingSent: true, valiadationErrors: null })),
		on(authUserActions.register_user_success, (state, action) => ({ ...state, isBeingSent: false, user: action.user })),
		on(authUserActions.register_user_failure, (state, action) => ({ ...state, isBeingSent: false, validationErrors: action.errors })),

		on(authUserActions.login_user, (state) => ({ ...state, isBeingSent: true, validationErrors: null })),
		on(authUserActions.login_user_success, (state, action) => ({ ...state, isBeingSent: false, user: action.user })),
		on(authUserActions.login_user_failure, (state, action) => ({ ...state, isBeingSent: false, validationErrors: action.errors })),

		on(authUserActions.get_user, (state) => ({ ...state, isBeingLoaded: true })),
		on(authUserActions.get_user_success, (state, action) => ({ ...state, isBeingLoaded: false, user: action.user })),
		on(authUserActions.get_user_failure, (state) => ({ ...state, isBeingLoaded: false, user: null })),
		on(authUserActions.update_user_success, (state, action) => ({ ...state, user: action.user })),
		on(routerNavigatedAction, (state) => ({ ...state, validationErrors: null })),


	),

})

export const { name: authFunctionalityKey, reducer: authFunctionalityReducer, selectIsBeingSent, selectIsBeingLoaded, selectUser, selectValidationErrors } = authFunctionality;