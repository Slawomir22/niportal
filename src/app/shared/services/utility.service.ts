import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UtilityService {
	range(start: number, end: number): number[] {
		return [...Array((end + 1) - start).keys()].map(number => number + 1)
	}
}
