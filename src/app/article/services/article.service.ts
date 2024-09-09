import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ArticleService {

	private http = inject(HttpClient);

	removeArticle(slug: string): Observable<{}> {
		const fullUrl = `${environment.api_URL}/articles/${slug}`;
		return this.http.delete(fullUrl);
	}
}
