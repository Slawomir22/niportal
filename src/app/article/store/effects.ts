import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticleService as SharedArticleService } from "src/app/shared/services/article.service";
import { articleActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Article } from "src/app/shared/models/article";
import { ArticleService } from "../services/article.service";
import { Router } from "@angular/router";


export const getArticleEffect = createEffect(
	(actions$ = inject(Actions), articleService = inject(SharedArticleService)) => {
		return actions$.pipe(
			ofType(articleActions.get_article),
			switchMap(({ slug }) => {
				return articleService.getArticle(slug).pipe(
					map((article: Article) => {
						return articleActions.get_article_success({ article })
					}),
					catchError(() => {
						return of(articleActions.get_article_failure())
					})
				)
			})
		)
	}, { functional: true }
)


export const removeArticleEffect = createEffect(
	(actions$ = inject(Actions), articleService = inject(ArticleService)) => {
		return actions$.pipe(
			ofType(articleActions.remove_article),
			switchMap(({ slug }) => {
				return articleService.removeArticle(slug).pipe(
					map(() => {
						return articleActions.remove_article_success()
					}),
					catchError(() => {
						return of(articleActions.remove_article_failure())
					})
				)
			})
		)
	}, { functional: true }
)


export const redirectAfterRemoveEffect = createEffect(
	(actions$ = inject(Actions), router = inject(Router)) => {
		return actions$.pipe(
			ofType(articleActions.remove_article_success),
			tap(() => {
				router.navigate(['/'])
			})
		)
	}, { functional: true, dispatch: false }

)