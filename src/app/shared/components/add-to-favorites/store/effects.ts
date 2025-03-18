import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AddToFavoritesService } from "../services/add-to-favorites.service";
import { addToFavoritesActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Article } from "src/app/shared/models/article";

export const addToFavoritesEffect = createEffect(
	(actions$ = inject(Actions), addToFavoritesService = inject(AddToFavoritesService)) => {
		return actions$.pipe(
			ofType(addToFavoritesActions.add_to_favorites),
			switchMap(({ isFavorited, slug }) => {
				const article$ = isFavorited ? addToFavoritesService.removeFromFavorites(slug) : addToFavoritesService.addToFavorites(slug);
				return article$.pipe(
					map((article: Article) => {
						return addToFavoritesActions.add_to_favorites_success({ article });
					}),
					catchError(() => {
						return of(addToFavoritesActions.add_to_favorites_failure());
					})

				)
			}),


		)
	}, { functional: true }

)