import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ArticleFormValues } from '../../models/articleFormValues';
import { BackEndErrors } from '../../models/backEndErrors';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendErrorsComponent } from '../backend-errors/backend-errors.component';


@Component({
	selector: 'app-article-form',
	templateUrl: './article-form.component.html',
	styleUrls: ['./article-form.component.css'],
	imports: [ReactiveFormsModule, CommonModule, BackendErrorsComponent],
	standalone: true
})
export class ArticleFormComponent implements OnInit {

	@Input() isBeingSubmitted: boolean = false;
	@Input() isBeingLoaded: boolean = false;
	@Input() articleData!: ArticleFormValues;
	@Input() errors: BackEndErrors | null = null;
	@Output() articleFormData = new EventEmitter<ArticleFormValues>();

	articleForm!: FormGroup;


	ngOnInit(): void {
		this.startingForm()
	}


	startingForm(): void {
		this.articleForm = new FormGroup({
			title: new FormControl('', Validators.required),
			description: new FormControl('', Validators.required),
			body: new FormControl('', Validators.required),
			tagList: new FormControl('', Validators.required)
		})

		if (this.articleData) {
			this.articleForm.patchValue({
				title: this.articleData.title,
				descripition: this.articleData.description,
				body: this.articleData.body,
				tagList: this.articleData.tagList.join(' ')

			})

		}


	}

	onSubmitArticleForm(): void {
		const articleFormValues: ArticleFormValues = {
			...this.articleForm.getRawValue(),
			tagList: this.articleForm.getRawValue().tagList.split(' ')
		}

		this.articleFormData.emit(articleFormValues);
	}

}
