import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractHttpService } from '../../../common/abstract-classes/abstract-http.service';
import { PointOfInterest } from '../models/poi.model';

@Injectable()
class VehicleService extends AbstractHttpService<PointOfInterest> {

	constructor(httpClient: HttpClient) {
		super(httpClient);
	}

	getType(): string {
		return 'PARKING';
	}

	getPointOfInterests(): Observable<PointOfInterest> {
		return super.getData()
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

}