import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vehicle } from '../models/vehicle.model';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class VehicleService {
	private vehicles$ = new ReplaySubject<Array<Vehicle>>();

	constructor(private firestore: AngularFirestore) {
		this.observeFirebaseChanges();
	}

	private observeFirebaseChanges(): void {
		this.firestore
			.collection('vehicles')
			.valueChanges()
			.subscribe((vehicles: Array<Vehicle>) => {
				this.vehicles$.next(vehicles);
			});
	}

	getVehicles(): Observable<Array<Vehicle>> {
		return this.vehicles$.asObservable();
	}

}
