import { Route } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import * as  allEditArticleEffect from "./store/effects";
import { provideState } from "@ngrx/store";
import { editArticleFunctionalityKey, editArticleFunctionalityReducer } from "./store/reducer";
import { EditArticleService } from "./services/edit-article.service";
import { EditArticleComponent } from "./components/edit-article/edit-article.component";


export const editArticleRoutes: Route[] = [
	{
		path: '',
		component: EditArticleComponent,
		providers: [
			provideEffects(allEditArticleEffect),
			provideState(editArticleFunctionalityKey, editArticleFunctionalityReducer),
			EditArticleService
		]
	}
]