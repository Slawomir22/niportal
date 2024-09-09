import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PersisitenceService {

	set(key: string, data: unknown): void {
		try {
			localStorage.setItem(key, JSON.stringify(data))
		} catch (error) {
			console.log('There is an errorr saving data to localStorage ', error)
		}
	}

	get(key: string): unknown {
		try {
			const localStorageData = localStorage.getItem(key);
			return localStorageData ? JSON.parse(localStorageData) : null;
		} catch (error) {
			console.log('There is an errorr getting data from localStorage ', error);
			return null;
		}
	}
}
