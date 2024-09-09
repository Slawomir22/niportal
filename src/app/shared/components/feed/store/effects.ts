import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FeedService } from "../services/feed.service";
import { inject } from "@angular/core";
import { catchError, map, of, switchMap } from "rxjs";
import { feedActions } from "./actions";
import { FeedResponse } from "../models/feed-response";

export const getFeedEffect = createEffect(
	(actions$ = inject(Actions), feedService = inject(FeedService)) => {
		return actions$.pipe(
			ofType(feedActions.get_feed),
			switchMap(({ url }) => {

				return feedService.getFeed(url).pipe(
					map((feed: FeedResponse) => {
						return feedActions.get_feed_success({ feed })
					}),
					catchError(() => {
						return of(feedActions.get_feed_failure());
					})

				)
			}),


		)
	}, { functional: true }

)