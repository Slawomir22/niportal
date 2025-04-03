import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserProfileResponse } from '../models/userProfileResponse';
import { environment } from 'src/environments/environment.development';
import { UserProfile } from '../models/userProfile';

@Injectable({
	providedIn: 'root'
})
export class UserProfileService {
	http = inject(HttpClient);

	getUserProfile(slug: string): Observable<UserProfile> {
		const fullUrl = `${environment.api_URL}/profiles/${slug}`;
		return this.http.get<UserProfileResponse>(fullUrl).pipe(
			map((response: UserProfileResponse) => response.profile),
		);
	}
}
