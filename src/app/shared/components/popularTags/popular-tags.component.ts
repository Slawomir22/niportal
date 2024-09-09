import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { popularTagsActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectIsBeingLoaded } from '../feed/store/reducer';
import { selectData, selectError } from './store/reducers';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-popular-tags',
	templateUrl: './popular-tags.component.html',
	styleUrls: ['./popular-tags.component.css'],
	standalone: true,
	imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink]
})
export class PopularTagsComponent implements OnInit {
	private store = inject(Store);

	popularTagsData$ = combineLatest({
		isBeingLoaded: this.store.select(selectIsBeingLoaded),
		error: this.store.select(selectError),
		data: this.store.select(selectData)

	})

	ngOnInit(): void {
		this.store.dispatch(popularTagsActions.get_popular_tags());
	}



}
