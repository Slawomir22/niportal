import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tag } from 'src/app/shared/models/tag';
import { environment } from 'src/environments/environment.development';
import { PopularTagsResponse } from '../models/popular-tags-response';


@Injectable({
	providedIn: 'root'
})
export class PopularTagsService {


	private http = inject(HttpClient);

	getPopularTags(): Observable<Tag[]> {
		const fullUrl = environment.api_URL + '/tags';
		return this.http.get<PopularTagsResponse>(fullUrl).pipe(
			map((response) => response.tags)
		);
	}


}
