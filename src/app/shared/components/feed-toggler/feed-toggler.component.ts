import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/auth/store/reducers';

@Component({
	selector: 'app-feed-toggler',
	templateUrl: './feed-toggler.component.html',
	styleUrls: ['./feed-toggler.component.css'],
	standalone: true,
	imports: [CommonModule, RouterLink, RouterLinkActive],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedTogglerComponent {
	@Input() tagName?: string;
	private store = inject(Store);

	currentUser$ = this.store.select(selectUser)

}
