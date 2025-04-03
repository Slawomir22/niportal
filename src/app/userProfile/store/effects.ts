import { inject } from "@angular/core"
import { UserProfileService } from "../services/user-profile.service"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, of, switchMap } from "rxjs"
import { userProfileActions } from "./actions"
import { UserProfile } from "../models/userProfile"

export const getProfileUserEffect = createEffect(
	(actions$ = inject(Actions), userProfileService = inject(UserProfileService)) => {
		return actions$.pipe(
			ofType(userProfileActions.get_user_profile),
			switchMap(({ slug }) => {
				return userProfileService.getUserProfile(slug).pipe(
					map((userProfile: UserProfile) => {
						return userProfileActions.get_user_profile_success({ userProfile })
					}),
					catchError(() => {
						return of(userProfileActions.get_user_profile_failure())
					})
				)
			})
		)
	}, { functional: true }
)