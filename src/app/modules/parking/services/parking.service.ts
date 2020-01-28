import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractHttpService } from '../../../common/abstract-classes/abstract-http.service';
import { Parking } from '../models/parking.model';

@Injectable()
class VehicleService extends AbstractHttpService<Parking> {

	constructor(httpClient: HttpClient) {
		super(httpClient);
	}

	getType(): string {
		return 'PARKING';
	}

	getParking(): Observable<Parking> {
		return super.getData()
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

}
