import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AbstractHttpService } from '../../common/abstract-classes/abstract-http.service';

@Injectable()
export class VehicleService extends AbstractHttpService<Vehicle> {

	constructor(httpClient: HttpClient) {
		super(httpClient);
	}

	getType(): string {
		return 'VEHICLE';
	}

	getVehicles(): Observable<Array<Vehicle>> {
		return super.getData()
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
						}));
	}

}
