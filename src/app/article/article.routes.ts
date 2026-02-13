import { Route } from "@angular/router";
import { ArticleComponent } from "./components/article/article.component";
import { provideEffects } from "@ngrx/effects";
import * as allArticelEffects from "./store/effects";
import { provideState } from "@ngrx/store";
import {
  articleFunctionalityKey,
  articleFunctionalityReducer,
} from "./store/reducer";
import { ArticleService } from "./services/article.service";

export const articleRoutes: Route[] = [
  {
    path: "",
    component: ArticleComponent,
    providers: [
      provideEffects(allArticelEffects),
      provideState(articleFunctionalityKey, articleFunctionalityReducer),
      ArticleService,
    ],
  },
];
