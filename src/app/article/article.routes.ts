import { Route } from "@angular/router";
import { ArticleComponent } from "./components/article/article.component";
import { provideEffects } from "@ngrx/effects";
import * as allArticlEffects from "./store/effects";
import { provideState } from "@ngrx/store";
import { articleFunctionalityKey, articleFunctionalityReducer } from "./store/reducer";
import { ArticleService } from "./services/article.service";

export const articleRoutes: Route[] = [
	{
		path: '',
		component: ArticleComponent,
		providers: [
			provideEffects(allArticlEffects),
			provideState(articleFunctionalityKey, articleFunctionalityReducer),
			ArticleService
		]
	},

]