import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FeedComponent } from "src/app/shared/components/feed/feed.component";
import { PopularTagsComponent } from "src/app/shared/components/popularTags/popular-tags.component";
import { FeedTogglerComponent } from "../../../shared/components/feed-toggler/feed-toggler.component";

@Component({
  selector: "app-global-feed",
  templateUrl: "./global-feed.component.html",
  styleUrls: ["./global-feed.component.css"],
  standalone: true,
  imports: [FeedComponent, PopularTagsComponent, FeedTogglerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalFeedComponent {
  apiURL = "/articles";
}
