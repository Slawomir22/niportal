import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserProfile } from "../models/userProfile";


export const userProfileActions = createActionGroup({
	source: "userProfile",
	events: {
		get_user_profile: props<{ slug: string }>(),
		get_user_profile_success: props<{ userProfile: UserProfile }>(),
		get_user_profile_failure: emptyProps(),
	}
})