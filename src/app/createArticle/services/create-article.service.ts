import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ArticleResponse } from 'src/app/shared/models/articleResponse';
import { Article } from 'src/app/shared/models/article';
import { ArticleRequest } from 'src/app/shared/models/articleRequest';
import { environment } from 'src/environments/environment';

@Injectable()
export class CreateArticleService {
	http = inject(HttpClient)

	createArticle(articleRequest: ArticleRequest): Observable<Article> {
		const fullUrl = environment.api_URL + '/articles';
		return this.http.post<ArticleResponse>(fullUrl, articleRequest).pipe(
			map((response) => response.article)
		)
	}

}
