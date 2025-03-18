import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article';
import { ArticleResponse } from 'src/app/shared/models/articleResponse';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AddToFavoritesService {
	private http = inject(HttpClient);

	getFullUrl(slug: string): string {
		return `${environment.api_URL}/articles/${slug}/favorite`;
	}

	addToFavorites(slug: string): Observable<Article> {
		const fullUrl = this.getFullUrl(slug);
		return this.http.post<ArticleResponse>(fullUrl, {}).pipe(map((response) => response.article)); {
		}
	}

	removeFromFavorites(slug: string): Observable<Article> {
		const fullUrl = this.getFullUrl(slug);
		return this.http.delete<ArticleResponse>(fullUrl).pipe(map((response) => response.article));
	}
}
