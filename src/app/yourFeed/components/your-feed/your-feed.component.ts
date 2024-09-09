import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { PopularTagsComponent } from 'src/app/shared/components/popularTags/popular-tags.component';
import { FeedTogglerComponent } from "../../../shared/components/feed-toggler/feed-toggler.component";

@Component({
	selector: 'app-your-feed',
	templateUrl: './your-feed.component.html',
	styleUrls: ['./your-feed.component.css'],
	standalone: true,
	imports: [FeedComponent, PopularTagsComponent, FeedTogglerComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class YourFeedComponent {
	apiURL = '/articles/feed'

}
