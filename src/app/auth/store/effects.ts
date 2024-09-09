import { inject } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { authUserActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { User } from "src/app/shared/models/user";
import { HttpErrorResponse } from "@angular/common/http";
import { PersisitenceService } from "src/app/shared/services/persisitence.service";
import { Router } from "@angular/router";




export const getUserEffect = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService), persisitenceService = inject(PersisitenceService)) => {
		return actions$.pipe(
			ofType(authUserActions.get_user),
			switchMap(() => {
				const token = persisitenceService.get('accessToken');
				if (!token) {
					return of(authUserActions.get_user_failure())
				}
				return authService.getUser().pipe(
					map((user: User) => {
						return authUserActions.get_user_success({ user })
					}),
					catchError(() => {
						return of(authUserActions.get_user_failure());
					})

				)
			}),


		)
	}, { functional: true }

)

export const registerUserEffects = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService), persisitenceService = inject(PersisitenceService)) => {
		return actions$.pipe(
			ofType(authUserActions.register_user),
			switchMap(({ request }) => {
				return authService.registerUser(request).pipe(
					map((user: User) => {
						persisitenceService.set('accessToken', user.token)
						return authUserActions.register_user_success({ user })
					}),
					catchError((errorsResponse: HttpErrorResponse) => {
						return of(authUserActions.register_user_failure({
							errors: errorsResponse.error.errors
						}))
					})
				)
			}
			)
		)
	}, { functional: true }
)

export const redirectOnRegisterEffect = createEffect(
	(actions$ = inject(Actions), router = inject(Router)) => {
		return actions$.pipe(
			ofType(authUserActions.register_user_success),
			tap(() => {
				router.navigateByUrl('/')
			})
		)
	}, { functional: true, dispatch: false }
)

export const loginUserEffects = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService), persisitenceService = inject(PersisitenceService)) => {
		return actions$.pipe(
			ofType(authUserActions.login_user),
			switchMap(({ request }) => {
				return authService.loginUser(request).pipe(
					map((user: User) => {
						persisitenceService.set('accessToken', user.token)
						return authUserActions.login_user_success({ user })
					}),
					catchError((errorsResponse: HttpErrorResponse) => {
						return of(authUserActions.login_user_failure({
							errors: errorsResponse.error.errors
						}))
					}))
			}),
		)
	}, { functional: true }
)

export const redirectOnLoginEffect = createEffect(
	(acttions$ = inject(Actions), router = inject(Router)) => {
		return acttions$.pipe(
			ofType(authUserActions.login_user_success),
			tap(() => {
				router.navigateByUrl('/')
			})

		)

	}, { functional: true, dispatch: false }

)


