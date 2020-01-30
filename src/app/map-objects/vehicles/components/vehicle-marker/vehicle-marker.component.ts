import { Component, Input } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { MatDialog } from '@angular/material/dialog';
import { VehicleMarkerInfo } from '../vehicle-marker-info/vehicle-marker-info.component';

@Component({
	selector: 'app-map-marker',
	templateUrl: './vehicle-marker.component.html'
})
export class VehicleMarkerComponent {
	@Input()
	vehicle: Vehicle;

	constructor(public dialog: MatDialog) {
	}

	openDialog(mapObject: any): void {
		this.dialog.open(VehicleMarkerInfo, {
			data: mapObject,
			position: {
				top: '20%'
			}
		});
	}

	vehicleMarker(vehicle: Vehicle): string {
		const isVehicleAvailable = vehicle.status !== 'AVAILABLE',
			isCar = vehicle.type === 'CAR',
			isTruck = vehicle.type === 'TRUCK';

		if (isCar) {
			if (isVehicleAvailable) {
				return 'assets/images/car-disabled.svg';
			} else {
				return 'assets/images/car.svg';
			}
		}

		if (isTruck) {
			if (isVehicleAvailable) {
				return 'assets/images/truck-disabled.svg';
			} else {
				return 'assets/images/truck.svg';
			}
		}
	}

}
