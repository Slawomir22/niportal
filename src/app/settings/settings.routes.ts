import { Route } from "@angular/router";
import { SettingsComponent } from "./components/settings/settings.component";
import { settingsFunctionalityKey, settingsFunctionalityReducer } from "./store/reducers";
import { provideState } from "@ngrx/store";

export const settingsRoutes: Route[] = [
	{
		path: '',
		component: SettingsComponent,
		providers: [provideState(settingsFunctionalityKey, settingsFunctionalityReducer)]

	},

]