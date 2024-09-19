import { BackEndErrors } from "src/app/shared/models/backEndErrors";

export interface StateSettings {
	isBeingSubmitted: boolean,
	errors: BackEndErrors | null

}

