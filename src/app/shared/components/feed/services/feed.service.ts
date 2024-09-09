import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedResponse } from '../models/feed-response';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root'
})
export class FeedService {
	private http = inject(HttpClient);

	getFeed(url: string): Observable<FeedResponse> {
		const fullUrl = environment.api_URL + url;
		return this.http.get<FeedResponse>(fullUrl);
	}

}
