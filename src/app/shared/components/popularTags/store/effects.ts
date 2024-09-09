import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PopularTagsService } from "../services/popular-tags.service";
import { popularTagsActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Tag } from "src/app/shared/models/tag";
export const popularTagsEffects = createEffect(
	(actions$ = inject(Actions), popularTagsService = inject(PopularTagsService)) => {
		return actions$.pipe(
			ofType(popularTagsActions.get_popular_tags),
			switchMap(() => {
				return popularTagsService.getPopularTags().pipe(
					map((popularTags: Tag[]) => {
						return popularTagsActions.get_popular_tags_success({ popularTags })
					}),
					catchError(() => {
						return of(popularTagsActions.get_popular_tags_failure())
					})
				)
			})
		)
	}, { functional: true }
)