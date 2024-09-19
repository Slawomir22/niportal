import { User } from "src/app/shared/models/user";
import { BackEndErrors } from "../../shared/models/backEndErrors";

export interface StateAuth {
	isBeingSent: boolean;
	user: User | null | undefined;
	isBeingLoaded: boolean;
	errors: BackEndErrors | null;
}