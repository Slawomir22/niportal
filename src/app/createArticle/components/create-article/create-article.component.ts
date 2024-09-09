import { Component, inject } from '@angular/core';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';
import { ArticleFormValues } from 'src/app/shared/models/articleFormValues';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectErrors, selectIsBeingSubmitted } from '../../store/reducer';
import { ArticleRequest } from 'src/app/shared/models/articleRequest';
import { createArticleActions } from '../../store/actions';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-create-article',
	templateUrl: './create-article.component.html',
	styleUrls: ['./create-article.component.css'],
	standalone: true,
	imports: [ArticleFormComponent, CommonModule],
})
export class CreateArticleComponent {
	private store = inject(Store);

	createArticleData$ = combineLatest({
		selectIsBeingSubmitted: this.store.select(selectIsBeingSubmitted),
		errors: this.store.select(selectErrors)
	})


	onSubmit(formValues: ArticleFormValues): void {
		const articleRequest: ArticleRequest = {
			article: formValues
		}

		this.store.dispatch(createArticleActions.create_article({ articleRequest }))
	}

}
