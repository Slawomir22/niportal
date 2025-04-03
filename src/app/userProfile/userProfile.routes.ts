import { Route } from "@angular/router";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserProfileService } from "./services/user-profile.service";
import { provideState } from "@ngrx/store";
import { userProfileFunctionalityReducer, userProfileFunctionalityKey } from "./store/reducer";
import * as allUserProfileEffects from "./store/effects";
import { provideEffects } from "@ngrx/effects";


export const userProfiledRoutes: Route[] = [
	{
		path: '',
		component: UserProfileComponent,
		providers: [UserProfileService, provideState(userProfileFunctionalityKey, userProfileFunctionalityReducer,), provideEffects(allUserProfileEffects)],
	},

]
