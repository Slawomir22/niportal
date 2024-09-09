import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.css'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent {
	@Input() message: string = 'Something have gone wrong';

}
