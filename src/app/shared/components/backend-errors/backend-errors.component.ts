import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BackEndErrors } from '../../models/backEndErrors';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-backend-errors',
	templateUrl: './backend-errors.component.html',
	styleUrls: ['./backend-errors.component.css'],
	imports: [CommonModule],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackendErrorsComponent implements OnInit {

	@Input()
	backendErrors!: BackEndErrors;

	backendErrorsInfo: string[] = [];

	ngOnInit(): void {
		this.backendErrorsInfo = Object.keys(this.backendErrors).map((key: string) => {
			const infoErrors = this.backendErrors[key]
			return ` ${key} - ${infoErrors} `;
		})
	}



}
