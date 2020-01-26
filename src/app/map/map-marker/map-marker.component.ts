import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';

@Component({
	selector: 'app-map-marker',
	templateUrl: './map-marker.component.html',
	styleUrls: ['./map-marker.component.scss']
})
export class MapMarkerComponent implements OnInit {
	@Input()
	vehicle: Vehicle;

	constructor() {
	}

	ngOnInit() {
	}

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

	markerType(vehicle: Vehicle): string {

		return this.vehicleMarker(vehicle);
	}

	getInfo(vehicle) {
	}

}
