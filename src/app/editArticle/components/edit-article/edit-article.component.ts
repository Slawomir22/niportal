import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { selectArticle, selectErrors, selectIsBeingLoaded } from '../../store/reducer';
import { editGetArticleActions } from '../../store/actions';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';
import { ArticleFormValues } from 'src/app/shared/models/articleFormValues';
import { ArticleRequest } from 'src/app/shared/models/articleRequest';
import { selectIsBeingSubmitted } from 'src/app/createArticle/store/reducer';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/models/article';

@Component({
	selector: 'app-edit-article',
	templateUrl: './edit-article.component.html',
	styleUrls: ['./edit-article.component.css'],
	standalone: true,
	imports: [ArticleFormComponent, CommonModule, LoadingComponent],
})
export class EditArticleComponent implements OnInit {


	private store = inject(Store);
	private route = inject(ActivatedRoute)
	slug = this.route.snapshot.paramMap.get('slug') ?? '';

	articleData$: Observable<ArticleFormValues> = this.store.pipe(
		select(selectArticle),
		filter((article): article is Article => article !== null),
		map((article: Article) => {
			return {
				title: article.title,
				description: article.description,
				body: article.body,
				tagList: article.tagList
			}
		})
	)

	editArticleData$ = combineLatest({
		isBeingSubmitted: this.store.select(selectIsBeingSubmitted),
		isBeingLoaded: this.store.select(selectIsBeingLoaded),
		errors: this.store.select(selectErrors),
		articleData: this.articleData$
	})


	onSubmit(formValues: ArticleFormValues): void {
		const articleRequest: ArticleRequest = {
			article: formValues
		}

		this.store.dispatch(editGetArticleActions.edit_article({ articleRequest, slug: this.slug }))
	}

	ngOnInit(): void {
		this.store.dispatch(editGetArticleActions.get_article({ slug: this.slug }))
	}
}
