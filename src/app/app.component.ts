import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './shared/components/navigation-bar/navigation-bar.component';
import { Store } from '@ngrx/store';
import { authUserActions } from './auth/store/actions';
import { GlobalFeedComponent } from './globalFeed/components/global-feed/global-feed.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [RouterOutlet, NavigationBarComponent, GlobalFeedComponent]
})
export class AppComponent implements OnInit {

	store = inject(Store);

	ngOnInit(): void {
		this.store.dispatch(authUserActions.get_user())
	}

}
