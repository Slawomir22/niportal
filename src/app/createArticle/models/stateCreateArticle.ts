import { BackEndErrors } from "src/app/shared/models/backEndErrors";

export interface StateCreateArticle {
	isBeingSubmitted: boolean;
	errors: BackEndErrors | null;
}
