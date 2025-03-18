import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectError, selectFeedData, selectIsBeingLoaded } from './store/reducer';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { environment } from 'src/environments/environment';
import queryString from 'query-string';
import { TagListComponent } from '../tag-list/tag-list.component';
import { AddToFavoritesComponent } from "../add-to-favorites/add-to-favorites.component";

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.css'],
	imports: [CommonModule, RouterLink, ErrorMessageComponent, LoadingComponent, PaginationComponent, TagListComponent, AddToFavoritesComponent],
	standalone: true
})
export class FeedComponent implements OnInit, OnChanges {

	@Input() apiURL: string = '';
	private store = inject(Store);
	private router = inject(Router);
	private route = inject(ActivatedRoute);
	limit: number = environment.limit;
	baseURL = this.router.url.split('?')[0];
	currentPage: number = 0;

	feedData$ = combineLatest({
		isBeingLoaded: this.store.select(selectIsBeingLoaded),
		error: this.store.select(selectError),
		feed: this.store.select(selectFeedData)
	})

	ngOnInit(): void {

		this.store.dispatch(feedActions.get_feed({ url: this.apiURL }));
		this.route.queryParams.subscribe((params: Params) => {
			this.currentPage = parseInt(params['page'] || '1');
			this.fetchFeed();
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		const apiURLChanged = !changes['apiURL'].firstChange && changes['apiURL'].currentValue !== changes['apiURL'].previousValue;
		if (apiURLChanged) {
			this.fetchFeed();
		}
	}

	fetchFeed(): void {

		const offset = this.currentPage * this.limit - this.limit;
		const parsedURL = queryString.parseUrl(this.apiURL);
		const stringifiedParams = queryString.stringify({
			limit: this.limit,
			offset,
			...parsedURL.query,
		})
		const apiURLWithParans = `${parsedURL.url}?${stringifiedParams}`;
		this.store.dispatch(feedActions.get_feed({ url: apiURLWithParans }));
	}

}