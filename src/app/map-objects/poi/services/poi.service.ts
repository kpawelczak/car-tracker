import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { PointOfInterest } from '../models/poi.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class PoiService {

	private poi$ = new ReplaySubject<Array<PointOfInterest>>();

	constructor(private firestore: AngularFirestore) {
		this.observeFirebaseChanges();
	}

	private observeFirebaseChanges(): void {
		this.firestore
			.collection('poi')
			.valueChanges()
			.subscribe((pointOfInterests: Array<PointOfInterest>) => {
				this.poi$.next(pointOfInterests);
			});
	}

	getPointOfInterests(): Observable<Array<PointOfInterest>> {
		return this.poi$.asObservable();
	}

}
