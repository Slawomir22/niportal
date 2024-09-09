import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { UtilityService } from '../../services/utility.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.css'],
	standalone: true,
	imports: [CommonModule, RouterLink]
})
export class PaginationComponent implements OnChanges {
	private utilityService = inject(UtilityService);
	@Input()
	total: unknown = 0;
	@Input() limit: number = 10;
	@Input() url: string = '';
	@Input() currentPage: number = 1;
	pagesCount: number = 1;
	pages: number[] = [];

	ngOnChanges(): void {
		this.pagesCount = Math.ceil(this.total as number / this.limit);
		this.pages = this.pagesCount > 0 ? this.utilityService.range(1, this.pagesCount) : [];
	}
}
