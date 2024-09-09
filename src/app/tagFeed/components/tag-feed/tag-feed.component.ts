import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { PopularTagsComponent } from 'src/app/shared/components/popularTags/popular-tags.component';
import { FeedTogglerComponent } from "../../../shared/components/feed-toggler/feed-toggler.component";
import { YourFeedComponent } from "../../../yourFeed/components/your-feed/your-feed.component";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-tag-feed',
	templateUrl: './tag-feed.component.html',
	styleUrls: ['./tag-feed.component.css'],
	standalone: true,
	imports: [FeedComponent, PopularTagsComponent, FeedTogglerComponent, YourFeedComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagFeedComponent implements OnInit {

	apiURL: string = '';
	tagName: string = '';

	private route = inject(ActivatedRoute);

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.tagName = params['slug'];
			this.apiURL = `/articles?tag=${this.tagName}`
		})
	}


}
