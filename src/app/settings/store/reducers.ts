import { createFeature, createReducer, on } from "@ngrx/store";
import { StateSettings } from "../models/stateSettings";
import { authUserActions } from "src/app/auth/store/actions";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: StateSettings = {
	isBeingSubmitted: false,
	errors: null
}

const settingsFunctionality = createFeature({
	name: "settings",
	reducer: createReducer(
		initialState,
		on(authUserActions.update_user, (state) => ({ ...state, isBeingSubmitted: true })),
		on(authUserActions.update_user_success, (state) => ({ ...state, isBeingSubmitted: false })),
		on(authUserActions.update_user_failure, (state, action) => ({ ...state, isBeingSubmitted: false, errors: action.errors })),
		on(routerNavigatedAction, () => initialState),
	)
})

export const { name: settingsFunctionalityKey, reducer: settingsFunctionalityReducer, selectIsBeingSubmitted, selectErrors } = settingsFunctionality