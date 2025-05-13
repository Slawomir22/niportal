import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { userProfileActions } from '../store/actions';
import { combineLatest, filter, map } from 'rxjs';
import { selectErrors, selectIsBeingLoaded, selectUserProfileData } from '../store/reducer';
import { selectUser } from 'src/app/auth/store/reducers';
import { User } from 'src/app/shared/models/user';
import { UserProfile } from '../models/userProfile';
import { CommonModule } from '@angular/common';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css'],
	standalone: true,
	imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
})
export class UserProfileComponent implements OnInit {

	slug: string = '';
	private route = inject(ActivatedRoute);
	private store = inject(Store);
	private router = inject(Router);
	isCurrentUserProfile$ = combineLatest({

		currentUser: this.store.pipe(
			select(selectUser),
			filter((currentUser): currentUser is User => Boolean(currentUser))
		),

		userProfile: this.store.pipe(
			select(selectUserProfileData),
			filter((userProfile): userProfile is UserProfile => Boolean(userProfile))
		),


	}).pipe(
		map(({ currentUser, userProfile }) => {
			return currentUser.username === userProfile.username;
		})
	)


	data$ = combineLatest({
		userProfile: this.store.select(selectUserProfileData),
		userProfileLoading: this.store.select(selectIsBeingLoaded),
		userProfileError: this.store.select(selectErrors),
		isCurrentUserProfile: this.isCurrentUserProfile$,
	})



	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.slug = params['slug'];
			this.getUserProfile();
		});

	}
	getUserProfile() {
		this.store.dispatch(userProfileActions.get_user_profile({ slug: this.slug }));
	}

	getApiUrl(): string {
		const isFavorites = this.router.url.includes('favorites');
		return isFavorites ? `/articles?favorited=${this.slug}` : `/articles?author=${this.slug}`;
	}
}
