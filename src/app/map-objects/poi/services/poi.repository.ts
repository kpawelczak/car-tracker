import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { PointOfInterest } from '../models/poi.model';
import { PoiService } from './poi.service';

@Injectable()
export class PoiRepository {
	private pointOfInterests$ = new Subject<Array<PointOfInterest>>();
	private pointOfInterests: Array<PointOfInterest> = [];

	constructor(private pointOfInterestService: PoiService) {
		this.pointOfInterestService
			.getPointOfInterests()
			.pipe(take(1))
			.subscribe(
				(pointOfInterests: Array<PointOfInterest>) => {
					this.pointOfInterests = pointOfInterests;
					this.pointOfInterests$.next(this.pointOfInterests);
				},
				(error) => console.log(error)
			);
	}

	observePointOfInterests(): Observable<Array<PointOfInterest>> {
		return this.pointOfInterests$.asObservable();
	}

	filterPointOfInterests(filterPoi: boolean): void {

		if (!filterPoi) {
			this.pointOfInterests$.next([]);
		} else {
			this.pointOfInterests$.next(this.pointOfInterests);
		}
	}

}
