import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RequestRegister } from '../models/requestRegister';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AuthUser } from '../models/authUser';
import { environment } from 'src/environments/environment.development';
import { RequestLogin } from '../models/requestLogin';
import { RequestUser } from 'src/app/shared/models/requestUser';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private http = inject(HttpClient);

	registerUser(data: RequestRegister): Observable<User> {
		const api_URL = environment.api_URL + '/users';
		return this.http.post<AuthUser>(api_URL, data).pipe(
			map((reply) => reply.user)
		);
	}

	loginUser(data: RequestLogin): Observable<User> {
		const api_URL = environment.api_URL + '/users/login';
		return this.http.post<AuthUser>(api_URL, data).pipe(
			map((reply) => reply.user)
		)
	}

	getUser(): Observable<User> {
		const api_URL = environment.api_URL + '/user';
		return this.http.get<AuthUser>(api_URL).pipe(
			map((reply) => reply.user)
		)
	}

	updateUser(user: RequestUser): Observable<User> {
		const api_URL = environment.api_URL + '/user';
		return this.http.put<AuthUser>(api_URL, user).pipe(
			map((reply) => reply.user)
		)
	}

}
