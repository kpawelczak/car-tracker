import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { Parking } from '../models/parking.model';
import { PointOfInterest } from '../models/poi.model';

@Component({
	selector: 'app-map-marker',
	templateUrl: './map-marker.component.html',
	styleUrls: ['./map-marker.component.scss']
})
export class MapMarkerComponent {
	@Input()
	vehicle: Vehicle;

	@Input()
	parking: Parking;

	@Input()
	pointOfInterest: PointOfInterest;

	parkingIcon: string = 'assets/images/parking.svg';
	poiIcon: string = 'assets/images/poi.svg';

	vehicleMarker(vehicle: Vehicle): string {
		const isVehicleAvailable = vehicle.status !== 'AVAILABLE',
			isCar = vehicle.type === 'CAR',
			isTruck = vehicle.type === 'TRUCK';

		if (isCar) {
			if (isVehicleAvailable) {
				return 'assets/images/car_gray.svg';
			} else {
				return 'assets/images/car_black.svg';
			}

		}

		if (isTruck) {
			if (isVehicleAvailable) {
				// return 'assets/images/truck_gray.png';
			} else {
				return 'assets/images/truck_black.svg';
			}
		}

	}

}
