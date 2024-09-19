import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RequestRegister } from '../../models/requestRegister';
import { StateAuth } from '../../models/stateAuth';
import { selectIsBeingSent, selectErrors } from '../../store/reducers';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BackendErrorsComponent } from 'src/app/shared/components/backend-errors/backend-errors.component';
import { authUserActions } from '../../store/actions';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	imports: [ReactiveFormsModule, CommonModule, RouterLink, BackendErrorsComponent],
	standalone: true,
})
export class RegisterComponent {

	isBeingSent$ = this.store.select(selectIsBeingSent);
	backendErrors$ = this.store.select(selectErrors);

	stateData$ = combineLatest({
		isBeingSent: this.isBeingSent$,
		backendErrors: this.backendErrors$

	})

	registerForm!: FormGroup;

	constructor(private store: Store<{ auth: StateAuth }>) { }


	ngOnInit(): void {

		this.registerForm = new FormGroup({
			username: new FormControl('', [Validators.required, Validators.minLength(3)]),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
		})

	}

	sendRegisterData() {

		const request: RequestRegister = {
			user: this.registerForm.value
		}
		this.store.dispatch(authUserActions.register_user({ request }));
	}

}
