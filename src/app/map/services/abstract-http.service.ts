import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export abstract class AbstractHttpService<T> {
	private readonly url: string = 'https://dev.vozilla.pl/api-client-portal';
	private readonly mapObjectType = '/map?objectType=';

	protected constructor(private httpClient: HttpClient) {

	}

	abstract getType(): string

	getData(): Observable<T> {
		return this.httpClient.get<T>(this.url + this.mapObjectType + this.getType());
	}
}

@Injectable()
class VehicleService extends AbstractHttpService<Vehicle> {

	constructor(httpClient: HttpClient) {
		super(httpClient);
	}

	getType(): string {
		return 'VEHICLE';
	}

	getVehicles(): Observable<Vehicle> {
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
