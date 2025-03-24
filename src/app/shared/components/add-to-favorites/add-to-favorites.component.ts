import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AddToFavoritesService } from './services/add-to-favorites.service';
import { Store } from '@ngrx/store';
import { addToFavoritesActions } from './store/actions';

@Component({
	selector: 'app-add-to-favorites',
	templateUrl: './add-to-favorites.component.html',
	styleUrls: ['./add-to-favorites.component.css'],
	standalone: true,
	imports: [CommonModule]
})
export class AddToFavoritesComponent {
	private store = inject(Store);
	@Input()
	isFavorited!: boolean;
	@Input()
	favoritesCount!: number;
	@Input()
	articleSlug!: string;

	manageLikes(): void {
		this.store.dispatch(addToFavoritesActions.add_to_favorites({ isFavorited: this.isFavorited, slug: this.articleSlug }));
		this.isFavorited ? this.favoritesCount-- : this.favoritesCount++;
		this.isFavorited = !this.isFavorited;

	}


}
