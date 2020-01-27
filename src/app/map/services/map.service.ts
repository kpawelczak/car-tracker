import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from './url';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { map, take, tap } from 'rxjs/operators';
import { Parking } from '../models/parking.model';
import { PointOfInterest } from '../models/poi.model';

@Injectable()
export class MapService {
	private readonly url: string = url;
	private readonly mapObjectType = '/map?objectType=';

	vehicles$ = new Subject<Array<Vehicle>>();

	parkingVisible: boolean = false;
	parking$ = new BehaviorSubject(this.parkingVisible);

	poiVisible: boolean = false;
	poi$ = new BehaviorSubject(this.poiVisible);

	constructor(private http: HttpClient) {
		this.getVehicles()
		.pipe(take(1))
		.subscribe();
	}

	getVehicles(): Observable<Array<Vehicle>> {

		return this.http.get(this.url + this.mapObjectType + 'VEHICLE')
				   .pipe(
					   map((data: any) => {
						   return data.objects.map((vehicle) => {

							   return new Vehicle(
								   vehicle.name,
								   vehicle.platesNumber,
								   vehicle.sideNumber,
								   vehicle.location,
								   vehicle.type,
								   vehicle.status,
								   vehicle.batteryLevelPct
							   );
						   });
					   }),
					   tap((vehicles) => this.vehicles$.next(vehicles))
				   );
	}

	getParking(): Observable<Array<Parking>> {
		return this.http.get(this.url + this.mapObjectType + 'PARKING')
				   .pipe(
					   map((data: any) => {
						   return data.objects.map((parking) => {

							   return new Parking(
								   parking.location,
								   parking.name,
								   parking.spacesCount,
								   parking.availableSpacesCount
							   );
						   });
					   })
				   );
	}

	getPOI(): Observable<Array<PointOfInterest>> {
		return this.http.get(this.url + this.mapObjectType + 'POI')
				   .pipe(
					   map((data: any) => {
						   return data.objects.map((pointOfInterest) => {

							   return new PointOfInterest(
								   pointOfInterest.name,
								   pointOfInterest.location,
								   pointOfInterest.category
							   );
						   });
					   })
				   );
	}

	observeVehicles(): Observable<Array<Vehicle>> {
		return this.vehicles$.asObservable();
	}

	filterVehicles(filteredVehicles: Array<Vehicle>): void {
		this.vehicles$.next(filteredVehicles);
	}

	observeParking(): Observable<boolean> {
		return this.parking$.asObservable();
	}

	toggleParking(): void {
		this.parkingVisible = !this.parkingVisible;
		this.parking$.next(this.parkingVisible);
	}

	observePoi(): Observable<boolean> {
		return this.poi$.asObservable();
	}

	togglePoi(): void {
		this.poiVisible = !this.poiVisible;
		this.poi$.next(this.poiVisible);
	}
}
