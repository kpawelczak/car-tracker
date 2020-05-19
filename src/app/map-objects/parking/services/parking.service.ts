import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Parking } from '../models/parking.model';
import { PointOfInterest } from '../../poi/models/poi.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ParkingService {

	private parking$ = new ReplaySubject<Array<Parking>>();

	constructor(private firestore: AngularFirestore) {
		this.observeFirebaseChanges();
	}

	private observeFirebaseChanges(): void {
		this.firestore
			.collection('parking')
			.valueChanges()
			.subscribe((parking: Array<Parking>) => {
				this.parking$.next(parking);
			});
	}

	getParking(): Observable<Array<PointOfInterest>> {
		return this.parking$.asObservable();
	}

}
