import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectUser } from 'src/app/auth/store/reducers';

@Component({
	selector: 'app-navigation-bar',
	templateUrl: './navigation-bar.component.html',
	styleUrls: ['./navigation-bar.component.css'],
	standalone: true,
	imports: [CommonModule, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {

	store = inject(Store);

	stateData$ = combineLatest({
		user: this.store.select(selectUser)
	})

}
