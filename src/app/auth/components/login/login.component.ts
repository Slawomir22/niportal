import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StateAuth } from '../../models/stateAuth';
import { selectIsBeingSent, selectErrors } from '../../store/reducers';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BackendErrorsComponent } from 'src/app/shared/components/backend-errors/backend-errors.component';
import { authUserActions } from '../../store/actions';
import { RequestLogin } from '../../models/requestLogin';


@Component({
	selector: 'app-register',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	imports: [ReactiveFormsModule, CommonModule, RouterLink, BackendErrorsComponent],
	standalone: true,
})
export class LoginComponent {

	isBeingSent$ = this.store.select(selectIsBeingSent);
	backendErrors$ = this.store.select(selectErrors);

	stateData$ = combineLatest({
		isBeingSent: this.isBeingSent$,
		backendErrors: this.backendErrors$

	})

	loginForm!: FormGroup;

	constructor(private store: Store<{ auth: StateAuth }>) { }


	ngOnInit(): void {

		this.loginForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
		})

	}

	sendLoginData() {

		const request: RequestLogin = {
			user: this.loginForm.value
		}
		this.store.dispatch(authUserActions.login_user({ request }));
	}

}
