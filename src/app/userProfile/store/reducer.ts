import { createFeature, createReducer, on } from "@ngrx/store";
import { UserProfileState } from "../models/userProfileState";
import { userProfileActions } from "./actions";
import { routerNavigatedAction } from "@ngrx/router-store";



const initialState: UserProfileState = {
	data: null,
	isBeingLoaded: false,
	errors: null,
}

const userProfileFunctionality = createFeature({
	name: 'userProfile',
	reducer: createReducer(
		initialState,
		on(userProfileActions.get_user_profile, (state) => ({ ...state, isBeingLoaded: true })),
		on(userProfileActions.get_user_profile_success, (state, action) => ({ ...state, isBeingLoaded: false, data: action.userProfile })),
		on(userProfileActions.get_user_profile_failure, (state) => ({ ...state, isBeingLoaded: false })),
		on(routerNavigatedAction, () => initialState)

	)
})


export const { name: userProfileFunctionalityKey, reducer: userProfileFunctionalityReducer, selectIsBeingLoaded, selectErrors, selectData: selectUserProfileData } = userProfileFunctionality;