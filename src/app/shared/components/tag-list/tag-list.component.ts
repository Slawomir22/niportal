import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tag } from '../../models/tag';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-tag-list',
	templateUrl: './tag-list.component.html',
	styleUrls: ['./tag-list.component.css'],
	imports: [CommonModule],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent {
	@Input() tags: Tag[] = [];

}
