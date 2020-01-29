import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Parking } from '../models/parking.model';
import { ParkingService } from './parking.service';

@Injectable()
export class ParkingRepository {
	private parking$ = new Subject<Array<Parking>>();
	private parking: Array<Parking> = [];

	constructor(private parkingService: ParkingService) {
		this.parkingService.getParking()
			.pipe(take(1))
			.subscribe(
				(parking) => {
					this.parking = parking;
					this.parking$.next(this.parking);
				}
			);
	}

	observeParking(): Observable<Array<Parking>> {
		return this.parking$.asObservable();
	}

	filterParking(filterParking: boolean): void {

		if (!filterParking) {
			this.parking$.next([]);
		} else {
			this.parking$.next(this.parking);
		}
	}
}
