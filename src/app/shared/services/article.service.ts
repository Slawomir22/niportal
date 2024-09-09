import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Article } from '../models/article';
import { ArticleResponse } from '../models/articleResponse';

@Injectable({
	providedIn: 'root'
})
export class ArticleService {

	private http = inject(HttpClient);

	getArticle(slug: string): Observable<Article> {
		const fullUrl = `${environment.api_URL}/articles/${slug}`;
		return this.http.get<ArticleResponse>(fullUrl).pipe(map((response) => response.article));
	}
}
