import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app/app.routes";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { isDevMode } from "@angular/core";
import { authFunctionalityKey, authFunctionalityReducer } from "./app/auth/store/reducers";
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideEffects } from "@ngrx/effects";
import * as allAuthUserEffects from "./app/auth/store/effects";
import { provideRouterStore, routerReducer } from "@ngrx/router-store";
import { authInterceptor } from "./app/shared/authInterceptor";
import * as allFeedEffects from "./app/shared/components/feed/store/effects";
import { feedFunctionalityKey, feedFunctionalityReducer } from "./app/shared/components/feed/store/reducer";
import { popularTagsFunctionalityKey, popularTagsFunctionalityReducer } from "./app/shared/components/popularTags/store/reducers";
import * as allPopularTagsEffects from "./app/shared/components/popularTags/store/effects";
import * as allAddToFavoritesEffects from "./app/shared/components/add-to-favorites/store/effects";
import { AddToFavoritesService } from "./app/shared/components/add-to-favorites/services/add-to-favorites.service";



bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes),
		provideHttpClient(withInterceptors([authInterceptor])),
		provideStore({
			router: routerReducer
		}),
		provideRouterStore(),
		provideEffects(
			allAuthUserEffects,
			allFeedEffects,
			allPopularTagsEffects,
			allAddToFavoritesEffects
		),
		provideStoreDevtools({
			maxAge: 25,
			autoPause: true,
			logOnly: !isDevMode(),
			trace: false,
			traceLimit: 75

		}),
		provideState(authFunctionalityKey, authFunctionalityReducer),
		provideState(feedFunctionalityKey, feedFunctionalityReducer),
		provideState(popularTagsFunctionalityKey, popularTagsFunctionalityReducer),
		AddToFavoritesService
	]
})
