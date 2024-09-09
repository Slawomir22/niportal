import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleActions } from '../../store/actions';
import { combineLatest, filter, map } from 'rxjs';
import { selectArticleData, selectError, selectIsBeingLoaded } from '../../store/reducer';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { selectUser } from 'src/app/auth/store/reducers';
import { User } from 'src/app/shared/models/user';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { TagListComponent } from 'src/app/shared/components/tag-list/tag-list.component';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css'],
	imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink, TagListComponent],
	standalone: true
})
export class ArticleComponent implements OnInit {

	private store = inject(Store);
	private route = inject(ActivatedRoute);
	slug = this.route.snapshot.paramMap.get('slug') ?? '';

	isAuthor$ = combineLatest({
		article: this.store.select(selectArticleData),
		user: this.store.select(selectUser).pipe(filter((user): user is User | null => user !== undefined))
	}).pipe(
		map(({ article, user }) => {
			if (!article || !user) {
				return false
			}
			return article.author.username === user.username
		})
	)

	articleData$ = combineLatest({
		isBeingLoaded: this.store.select(selectIsBeingLoaded),
		error: this.store.select(selectError),
		article: this.store.select(selectArticleData),
		isAuthor: this.isAuthor$

	})

	ngOnInit(): void {
		this.store.dispatch(articleActions.get_article({ slug: this.slug }))
	}

	renoveArticle(): void {
		this.store.dispatch(articleActions.remove_article({ slug: this.slug }))
	}
}
