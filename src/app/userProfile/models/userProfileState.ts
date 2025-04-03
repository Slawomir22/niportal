import { UserProfile } from "./userProfile";

export interface UserProfileState {
	data: UserProfile | null;
	isBeingLoaded: boolean;
	errors: string | null;

}