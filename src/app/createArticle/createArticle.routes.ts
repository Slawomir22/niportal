import { Route } from "@angular/router";
import { CreateArticleComponent } from "./components/create-article/create-article.component";
import { provideEffects } from "@ngrx/effects";
import * as  allCreateArticleEffect from "./store/effects";
import { provideState } from "@ngrx/store";
import { createArticleFunctionalityKey, createArticleFunctionalityReducer } from "./store/reducer";
import { CreateArticleService } from "./services/create-article.service";

export const createArticleRoutes: Route[] = [
	{
		path: '',
		component: CreateArticleComponent,
		providers: [
			provideEffects(allCreateArticleEffect),
			provideState(createArticleFunctionalityKey, createArticleFunctionalityReducer),
			CreateArticleService
		]
	}

]