import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, Subject, takeUntil, tap } from 'rxjs';
import { selectUser } from 'src/app/auth/store/reducers';
import { User } from 'src/app/shared/models/user';
import { selectErrors, selectIsBeingSubmitted } from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { BackendErrorsComponent } from 'src/app/shared/components/backend-errors/backend-errors.component';
import { RequestUser } from 'src/app/shared/models/requestUser';
import { authUserActions } from 'src/app/auth/store/actions';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css'],
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, BackendErrorsComponent]
})
export class SettingsComponent implements OnInit, OnDestroy {

	private store = inject(Store);
	user!: User;
	onDestroy$ = new Subject<void>();
	stateData$ = combineLatest({
		selectIsBeingSubmitted: this.store.select(selectIsBeingSubmitted),
		errors: this.store.select(selectErrors)
	})

	settingsForm: FormGroup = new FormGroup({
		username: new FormControl(''),
		image: new FormControl(''),
		bio: new FormControl(''),
		email: new FormControl(''),
		password: new FormControl('')
	})

	ngOnInit(): void {
		this.store.pipe(
			takeUntil(this.onDestroy$),
			select(selectUser),
			filter(Boolean),
			tap(console.log)
		).subscribe(user => {
			this.user = user;
			this.startingForm();
		})

	}
	startingForm(): void {
		if (this.user) {
			this.settingsForm.patchValue({
				username: this.user.username,
				image: this.user.image ?? '',
				bio: this.user.bio ?? '',
				email: this.user.email,
				password: ''
			})
		} else {
			throw new Error(' No user  logged in')
		}
	}

	onSubmitSettingsForm(): void {
		if (this.user) {
			const user: RequestUser = {
				user: {
					...this.user,
					...this.settingsForm.getRawValue()
				}
			}


			this.store.dispatch(authUserActions.update_user({ user }))
		} else {
			throw new Error('user is not set');
		}


	}
	logout(): void {
		this.store.dispatch(authUserActions.logout())
	}
	ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

} 
