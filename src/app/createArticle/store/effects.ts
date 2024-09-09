import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Article } from "src/app/shared/models/article";
import { Router } from "@angular/router";
import { CreateArticleService } from "../services/create-article.service";
import { createArticleActions } from "./actions";
import { HttpErrorResponse } from "@angular/common/http";


export const createArticleEffect = createEffect(
	(actions$ = inject(Actions), createArticleService = inject(CreateArticleService)) => {
		return actions$.pipe(
			ofType(createArticleActions.create_article),
			switchMap(({ articleRequest }) => {
				return createArticleService.createArticle(articleRequest).pipe(
					map((article: Article) => {
						return createArticleActions.create_article_success({ article })
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(createArticleActions.create_article_failure({
							errors: errorResponse.error.errors
						}))
					})
				)
			})
		)
	}, { functional: true }
)

export const redirectAfterCreateEffect = createEffect(
	(actions$ = inject(Actions), router = inject(Router)) => {
		return actions$.pipe(
			ofType(createArticleActions.create_article_success),
			tap(({ article }) => {
				router.navigate(['/articles', article.slug])
			})
		)
	}, { functional: true, dispatch: false }

)