import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from './url';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { map } from 'rxjs/operators';
import { Parking } from '../models/parking.model';
import { PointOfInterest } from '../models/poi.model';

@Injectable()
export class MapService {
	private readonly url: string = url;
	private readonly mapObjectType = '/map?objectType=';

	cars: Array<Vehicle> = [];
	trucks: Array<Vehicle> = [];
	availableVehicles: Array<Vehicle> =[];

	constructor(private http: HttpClient) {
	}

	getVehicles(): Observable<Array<Vehicle>> {

		return this.http.get(this.url + this.mapObjectType + 'VEHICLE')
				   .pipe(
					   map((data: any) => {
						   return data.objects.map((vehicle) => {

							   if (vehicle.type === 'CAR') {
								   this.cars.push(vehicle);
							   } else if (vehicle.type === 'TRUCK') {
								   this.trucks.push(vehicle);
							   }

							   return (new Vehicle(
								   vehicle.name,
								   vehicle.platesNumber,
								   vehicle.sideNumber,
								   vehicle.location,
								   vehicle.type,
								   vehicle.status,
								   vehicle.batteryLevelPct
							   ));
						   });
					   })
				   );
	}

	getParking(): Observable<any> {
		return this.http.get(this.url + this.mapObjectType + 'PARKING')
			.pipe(
				map((data: any) => {
					return data.objects.map((parking) => {

						return (new Parking(
							parking.location,
							parking.name,
							parking.spacesCount,
							parking.availableSpacesCount
						));
					});
				})
			);
	}

	getPOI(): Observable<any> {
		return this.http.get(this.url + this.mapObjectType + 'POI')
				   .pipe(
					   map((data: any) => {
						   return data.objects.map((pointOfInterest) => {

							   return (new PointOfInterest(
								   pointOfInterest.name,
								   pointOfInterest.location,
								   pointOfInterest.category
							   ));
						   });
					   })
				   );
	}

}
