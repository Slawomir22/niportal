import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { PersisitenceService } from "./services/persisitence.service";


export const authInterceptor: HttpInterceptorFn = (request, next) => {
	const persisitenceService = inject(PersisitenceService);
	const token = persisitenceService.get('accessToken');

	request = request.clone({
		setHeaders: {
			Authorization: token ? `Token ${token}` : '',
		},
	})


	return next(request);
} 