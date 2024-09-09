import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Article } from "src/app/shared/models/article";
import { Router } from "@angular/router";
import { ArticleService as SharedArticleService } from "src/app/shared/services/article.service";
import { editGetArticleActions } from "./actions";
import { HttpErrorResponse } from "@angular/common/http";
import { EditArticleService } from "../services/edit-article.service";



export const getArticleEffect = createEffect(
	(actions$ = inject(Actions), articleService = inject(SharedArticleService)) => {
		return actions$.pipe(
			ofType(editGetArticleActions.get_article),
			switchMap(({ slug }) => {
				return articleService.getArticle(slug).pipe(
					map((article: Article) => {
						return editGetArticleActions.get_article_success({ article })
					}),
					catchError(() => {
						editGetArticleActions
						return of(editGetArticleActions.get_article_failure())
					})
				)
			})
		)
	}, { functional: true }
)




export const editArticleEffect = createEffect(
	(actions$ = inject(Actions), editArticleService = inject(EditArticleService)) => {
		return actions$.pipe(
			ofType(editGetArticleActions.edit_article),
			switchMap(({ slug, articleRequest }) => {
				return editArticleService.updateArticle(slug, articleRequest).pipe(
					map((article: Article) => {
						return editGetArticleActions.edit_article_success({ article })
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(editGetArticleActions.edit_article_failure({
							errors: errorResponse.error.errors
						}))
					})
				)
			})
		)
	}, { functional: true }
)

export const redirectAfterEditEffect = createEffect(
	(actions$ = inject(Actions), router = inject(Router)) => {
		return actions$.pipe(
			ofType(editGetArticleActions.edit_article_success),
			tap(({ article }) => {
				router.navigate(['/articles', article.slug])
			})
		)
	}, { functional: true, dispatch: false }

)